import SwiftUI

struct ResultView: View {
    let result: SummaryResult
    let goal: String
    let onReset: () -> Void
    @State private var copied = false

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            HStack {
                Text("PILLOW SUMMARY")
                    .font(.system(size: 10, design: .monospaced))
                    .tracking(3)
                    .foregroundStyle(EarthPalette.ink.opacity(0.4))
                Spacer()
                Button { copyToClipboard() } label: {
                    Image(systemName: copied ? "checkmark" : "doc.on.doc")
                        .font(.system(size: 14))
                        .foregroundStyle(copied ? EarthPalette.teal : EarthPalette.ink.opacity(0.3))
                }
            }
            .padding(.bottom, 24)

            // Your AI Brief label
            HStack(spacing: 8) {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundStyle(EarthPalette.teal)
                    .font(.system(size: 14))
                Text("YOUR AI BRIEF")
                    .font(.system(size: 10, design: .monospaced))
                    .tracking(2)
                    .foregroundStyle(EarthPalette.ink.opacity(0.4))
            }
            .padding(.bottom, 16)

            // Goal
            HStack {
                Text("GOAL:")
                    .font(.system(size: 10, design: .monospaced))
                    .tracking(2)
                    .foregroundStyle(EarthPalette.ink.opacity(0.35))
                Text(goal)
                    .font(.subheadline)
                    .foregroundStyle(EarthPalette.ink.opacity(0.6))
            }
            .padding(12)
            .background(EarthPalette.ink.opacity(0.03))
            .overlay(Rectangle().stroke(EarthPalette.ink.opacity(0.08), lineWidth: 1))
            .padding(.bottom, 24)

            // Title + Score
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 6) {
                    Text(result.title.uppercased())
                        .font(.custom("Bebas Neue", size: 28, relativeTo: .title))
                        .foregroundStyle(EarthPalette.ink)

                    HStack(spacing: 8) {
                        if result.platform != "unknown" {
                            Text(result.platform.uppercased())
                                .font(.system(size: 9, design: .monospaced))
                                .tracking(1.5)
                                .foregroundStyle(EarthPalette.ink.opacity(0.4))
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(EarthPalette.ink.opacity(0.05))
                        }
                        if result.readTime != "-" {
                            Text("\(result.readTime) read")
                                .font(.caption)
                                .foregroundStyle(EarthPalette.ink.opacity(0.3))
                        }
                    }
                }

                Spacer()

                if result.relevanceScore > 0 {
                    Text("\(result.relevanceScore)%")
                        .font(.system(size: 14, design: .monospaced))
                        .fontWeight(.semibold)
                        .foregroundStyle(.white)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(scoreColor)
                }
            }
            .padding(.bottom, 20)

            // Summary
            Text(result.summary)
                .font(.subheadline)
                .foregroundStyle(EarthPalette.ink.opacity(0.55))
                .lineSpacing(4)
                .padding(.bottom, 20)

            // Key Insights
            if !result.keyInsights.isEmpty {
                Text("KEY INSIGHTS")
                    .font(.system(size: 10, design: .monospaced))
                    .tracking(2)
                    .foregroundStyle(EarthPalette.ink.opacity(0.35))
                    .padding(.bottom, 10)

                VStack(alignment: .leading, spacing: 8) {
                    ForEach(result.keyInsights, id: \.self) { insight in
                        HStack(alignment: .top, spacing: 10) {
                            Text("—")
                                .foregroundStyle(EarthPalette.teal)
                            Text(insight)
                                .font(.subheadline)
                                .foregroundStyle(EarthPalette.ink.opacity(0.5))
                        }
                    }
                }
                .padding(.bottom, 24)
            }

            // Actions
            Divider()
                .background(EarthPalette.ink.opacity(0.08))
                .padding(.bottom, 16)

            Button { onReset() } label: {
                Text("TRY ANOTHER URL")
                    .font(.system(size: 11, design: .monospaced))
                    .tracking(1.5)
                    .foregroundStyle(EarthPalette.ink.opacity(0.6))
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                    .overlay(Rectangle().stroke(EarthPalette.ink.opacity(0.12), lineWidth: 1))
            }

            // Page indicator
            HStack {
                Spacer()
                Text("03 / 03")
                    .font(.system(size: 10, design: .monospaced))
                    .foregroundStyle(EarthPalette.ink.opacity(0.2))
            }
            .padding(.top, 32)
        }
    }

    private var scoreColor: Color {
        if result.relevanceScore >= 80 { return EarthPalette.teal }
        if result.relevanceScore >= 50 { return EarthPalette.orange }
        return EarthPalette.ink.opacity(0.3)
    }

    private func copyToClipboard() {
        let text = """
        \(result.title)

        \(result.summary)

        Key Insights:
        \(result.keyInsights.map { "- \($0)" }.joined(separator: "\n"))
        """
        UIPasteboard.general.string = text
        copied = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            copied = false
        }
    }
}
