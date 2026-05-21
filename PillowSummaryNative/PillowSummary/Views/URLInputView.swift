import SwiftUI

struct URLInputView: View {
    @Binding var url: String
    let goal: String
    let onBack: () -> Void
    let onSubmit: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            HStack {
                Text("PILLOW SUMMARY")
                    .font(.system(size: 10, design: .monospaced))
                    .tracking(3)
                    .foregroundStyle(EarthPalette.ink.opacity(0.4))
                Spacer()
            }
            .padding(.bottom, 40)

            // Step indicator
            HStack(spacing: 10) {
                Rectangle()
                    .fill(EarthPalette.rose)
                    .frame(width: 32, height: 32)
                    .overlay(
                        Text("2")
                            .font(.custom("Bebas Neue", size: 18, relativeTo: .body))
                            .foregroundStyle(.white)
                    )
                Text("PASTE AN ARTICLE URL")
                    .font(.custom("Bebas Neue", size: 22, relativeTo: .title3))
                    .foregroundStyle(EarthPalette.ink)
            }
            .padding(.bottom, 24)

            // Goal display
            HStack {
                Text("GOAL:")
                    .font(.system(size: 10, design: .monospaced))
                    .tracking(2)
                    .foregroundStyle(EarthPalette.ink.opacity(0.35))
                Text(goal)
                    .font(.subheadline)
                    .foregroundStyle(EarthPalette.ink.opacity(0.6))
                Spacer()
                Button("CHANGE") { onBack() }
                    .font(.system(size: 10, design: .monospaced))
                    .tracking(1.5)
                    .foregroundStyle(EarthPalette.teal)
            }
            .padding(12)
            .background(EarthPalette.ink.opacity(0.03))
            .overlay(Rectangle().stroke(EarthPalette.ink.opacity(0.08), lineWidth: 1))
            .padding(.bottom, 24)

            // URL input
            HStack(spacing: 0) {
                TextField("https://example.com/article...", text: $url)
                    .font(.subheadline)
                    .keyboardType(.URL)
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 12)
                    .background(EarthPalette.ink.opacity(0.03))
                    .overlay(
                        Rectangle()
                            .stroke(EarthPalette.ink.opacity(0.1), lineWidth: 1)
                    )
                    .onSubmit {
                        if !url.trimmingCharacters(in: .whitespaces).isEmpty {
                            onSubmit()
                        }
                    }

                Button {
                    onSubmit()
                } label: {
                    Text("SUMMARIZE")
                        .font(.system(size: 11, design: .monospaced))
                        .tracking(1.5)
                        .foregroundStyle(EarthPalette.bone)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 13)
                        .background(
                            url.trimmingCharacters(in: .whitespaces).isEmpty
                                ? EarthPalette.ink.opacity(0.3)
                                : EarthPalette.ink
                        )
                }
                .disabled(url.trimmingCharacters(in: .whitespaces).isEmpty)
            }

            // Page indicator
            HStack {
                Spacer()
                Text("02 / 03")
                    .font(.system(size: 10, design: .monospaced))
                    .foregroundStyle(EarthPalette.ink.opacity(0.2))
            }
            .padding(.top, 32)
        }
    }
}
