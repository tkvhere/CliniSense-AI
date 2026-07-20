import os
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
)


class PDFService:

    OUTPUT_FOLDER = "generated_reports"

    @staticmethod
    def generate(report):

        os.makedirs(PDFService.OUTPUT_FOLDER, exist_ok=True)

        filename = f"report_{report['_id']}.pdf"

        filepath = os.path.join(
            PDFService.OUTPUT_FOLDER,
            filename
        )

        doc = SimpleDocTemplate(
            filepath,
            rightMargin=40,
            leftMargin=40,
            topMargin=40,
            bottomMargin=40,
        )

        styles = getSampleStyleSheet()

        title_style = ParagraphStyle(
            "TitleStyle",
            parent=styles["Title"],
            alignment=TA_CENTER,
            fontSize=22,
            textColor=colors.HexColor("#0F4C81"),
            spaceAfter=6,
        )

        subtitle_style = ParagraphStyle(
            "SubtitleStyle",
            parent=styles["Heading2"],
            alignment=TA_CENTER,
            fontSize=13,
            textColor=colors.HexColor("#2563EB"),
            spaceAfter=18,
        )

        section_style = ParagraphStyle(
            "SectionStyle",
            parent=styles["Heading2"],
            alignment=TA_LEFT,
            textColor=colors.white,
            backColor=colors.HexColor("#0F4C81"),
            leftIndent=5,
            spaceBefore=12,
            spaceAfter=8,
        )

        body_style = ParagraphStyle(
            "BodyStyle",
            parent=styles["BodyText"],
            fontSize=10,
            leading=18,
        )

        elements = []

        # -------------------------------------
        # Analysis
        # -------------------------------------

        analysis = report.get("analysis", {})

        if isinstance(analysis, dict) and "analysis" in analysis:
            analysis = analysis["analysis"]

        summary = analysis.get(
            "summary",
            "Summary not available."
        )

        findings = analysis.get(
            "findings",
            []
        )

        recommendations = analysis.get(
            "recommendations",
            []
        )

        confidence = analysis.get(
            "confidence",
            0
        )

        health_score = analysis.get(
            "health_score",
            "N/A"
        )

        risk_level = analysis.get(
            "risk_level",
            "N/A"
        )

        severity = analysis.get(
            "severity",
            "N/A"
        )

        clinical_interpretation = analysis.get(
            "clinical_interpretation",
            "Clinical interpretation not available."
        )

        patient_data = analysis.get(
            "patient_data",
            {}
        )

        report_type = report.get(
            "report_type",
            "Medical Report"
        )

        # -------------------------------------
        # HEADER
        # -------------------------------------

        elements.append(
            Paragraph(
                "🏥 CliniSense AI",
                title_style,
            )
        )

        elements.append(
            Paragraph(
                "AI-Powered Clinical Intelligence Report",
                subtitle_style,
            )
        )

        metadata = Table(
            [
                ["Report ID", str(report["_id"])[:10].upper()],
                [
                    "Generated",
                    datetime.now().strftime("%d %b %Y %I:%M %p")
                ],
                [
                    "Original File",
                    report.get("original_filename", "-")
                ],
                [
                    "Report Type",
                    report_type.upper()
                ],
            ],
            colWidths=[120, 300]
        )

        metadata.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#EAF4FF")),
            ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
            ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
        ]))

        elements.append(metadata)

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        # -------------------------------------
        # PATIENT INFORMATION
        # -------------------------------------

        elements.append(
            Paragraph(
                "Patient Information",
                section_style,
            )
        )

        patient_table = Table(
            [
                ["Patient Name", "Patient"],
                ["Age", "--"],
                ["Gender", "--"],
                [
                    "Report",
                    report.get("original_filename", "-")
                ],
            ],
            colWidths=[140, 280]
        )

        patient_table.setStyle(TableStyle([
            ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#F5F9FF")),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
        ]))

        elements.append(patient_table)

        elements.append(
            Spacer(1, 0.25 * inch)
        )
                # -------------------------------------
        # LABORATORY RESULTS
        # -------------------------------------

        elements.append(
            Paragraph(
                "Laboratory Results",
                section_style,
            )
        )

        results = analysis.get("results", {})

        table_data = [
            [
                "Parameter",
                "Value",
                "Unit",
                "Status",
            ]
        ]

        if results:

            for _, item in results.items():

                table_data.append([
                    item.get("name", "-"),
                    str(item.get("value", "-")),
                    item.get("unit", "-"),
                    item.get("status", "-"),
                ])

        else:

            table_data.append([
                "No laboratory results available.",
                "",
                "",
                "",
            ])

        result_table = Table(
            table_data,
            colWidths=[170, 80, 80, 90]
        )

        result_table.setStyle(TableStyle([

            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0F4C81")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

            ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),

            ("ALIGN", (1, 1), (-1, -1), "CENTER"),

            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),

            ("TOPPADDING", (0, 0), (-1, -1), 8),

            ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),

        ]))

        elements.append(result_table)

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        # -------------------------------------
        # AI SUMMARY
        # -------------------------------------

        elements.append(
            Paragraph(
                "AI Medical Summary",
                section_style,
            )
        )

        elements.append(
            Paragraph(
                summary,
                body_style,
            )
        )

        elements.append(
            Spacer(1, 0.2 * inch)
        )

        # -------------------------------------
        # CLINICAL INTERPRETATION
        # -------------------------------------

        elements.append(
            Paragraph(
                "Clinical Interpretation",
                section_style,
            )
        )

        elements.append(
            Paragraph(
                clinical_interpretation,
                body_style,
            )
        )

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        # -------------------------------------
        # HEALTH ASSESSMENT
        # -------------------------------------

        elements.append(
            Paragraph(
                "Health Assessment",
                section_style,
            )
        )

        assessment = Table(
            [

                [
                    "Health Score",
                    f"{health_score}/100"
                ],

                [
                    "Risk Level",
                    risk_level
                ],

                [
                    "Severity",
                    severity
                ],

                [
                    "AI Confidence",
                    f"{round(confidence*100)}%"
                ],

            ],
            colWidths=[170, 250]
        )

        assessment.setStyle(TableStyle([

            ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),

            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#EAF4FF")),

            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),

            ("TOPPADDING", (0, 0), (-1, -1), 8),

            ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),

        ]))

        elements.append(assessment)

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        # -------------------------------------
        # FINDINGS
        # -------------------------------------

        elements.append(
            Paragraph(
                "Clinical Findings",
                section_style,
            )
        )

        if findings:

            for finding in findings:

                elements.append(
                    Paragraph(
                        f"• {finding}",
                        body_style,
                    )
                )

        else:

            elements.append(
                Paragraph(
                    "No abnormal findings detected.",
                    body_style,
                )
            )

        elements.append(
            Spacer(1, 0.25 * inch)
        )
                # -------------------------------------
        # RECOMMENDATIONS
        # -------------------------------------

        elements.append(
            Paragraph(
                "Recommendations",
                section_style,
            )
        )

        if recommendations:

            for recommendation in recommendations:

                if isinstance(recommendation, str):

                    elements.append(
                        Paragraph(
                            f"• {recommendation}",
                            body_style,
                        )
                    )

                    elements.append(
                        Spacer(1, 0.08 * inch)
                    )

                elif isinstance(recommendation, dict):

                    parameter = recommendation.get(
                        "parameter",
                        "General Recommendation"
                    )

                    elements.append(
                        Paragraph(
                            f"<b>{parameter}</b>",
                            styles["Heading3"],
                        )
                    )

                    categories = [
                        ("Medical", "medical"),
                        ("Diet", "diet"),
                        ("Lifestyle", "lifestyle"),
                        ("Monitoring", "monitoring"),
                    ]

                    for title, key in categories:

                        items = recommendation.get(key, [])

                        if items:

                            elements.append(
                                Paragraph(
                                    f"<b>{title}</b>",
                                    body_style,
                                )
                            )

                            for item in items:

                                elements.append(
                                    Paragraph(
                                        f"• {item}",
                                        body_style,
                                    )
                                )

                            elements.append(
                                Spacer(1, 0.05 * inch)
                            )

        else:

            elements.append(
                Paragraph(
                    "No recommendations available.",
                    body_style,
                )
            )

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        # -------------------------------------
        # AI CONFIDENCE
        # -------------------------------------

        elements.append(
            Paragraph(
                "AI Confidence",
                section_style,
            )
        )

        confidence_table = Table(
            [
                [
                    "Model Confidence",
                    f"{round(confidence * 100)}%"
                ]
            ],
            colWidths=[180, 240]
        )

        confidence_table.setStyle(TableStyle([
            ("GRID", (0, 0), (-1, -1), 0.4, colors.grey),
            ("BACKGROUND", (0, 0), (0, 0), colors.HexColor("#EAF4FF")),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("FONTNAME", (0, 0), (0, 0), "Helvetica-Bold"),
        ]))

        elements.append(confidence_table)

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        # -------------------------------------
        # DISCLAIMER
        # -------------------------------------

        elements.append(
            Paragraph(
                "Important Disclaimer",
                section_style,
            )
        )

        disclaimer = (
            "This AI-generated clinical report is intended to assist "
            "healthcare professionals by providing automated analysis "
            "of laboratory reports. It should not be considered a final "
            "medical diagnosis. Clinical decisions must always be made "
            "by a qualified physician after considering the patient's "
            "history, examination, and additional investigations."
        )

        elements.append(
            Paragraph(
                disclaimer,
                body_style,
            )
        )

        elements.append(
            Spacer(1, 0.30 * inch)
        )

        # -------------------------------------
        # FOOTER
        # -------------------------------------

        elements.append(
            Paragraph(
                "<b>Generated by CliniSense AI</b>",
                subtitle_style,
            )
        )

        elements.append(
            Paragraph(
                "AI-Powered Clinical Intelligence & Patient Assistance Platform",
                body_style,
            )
        )

        elements.append(
            Paragraph(
                f"Report Generated on: {datetime.now().strftime('%d %B %Y %I:%M %p')}",
                body_style,
            )
        )

        doc.build(elements)

        return filepath