import SwiftUI

struct GoalView: View {
    @Binding var goal: String
    let presetGoals: [String]
    let onSelect: (String) -> Void

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

            // Stencil headline
            Text("WHAT DO\nYOU WANT\nTO LEARN?")
                .font(.custom("Bebas Neue", size: 56, relativeTo: .largeTitle))
                .foregroundStyle(EarthPalette.ink)
                .lineSpacing(-4)
                .padding(.bottom, 8)

            Text("Pick a goal or type your own.")
                .font(.subheadline)
                .foregroundStyle(EarthPalette.ink.opacity(0.45))
                .padding(.bottom, 32)

            // Colored preset cards
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 8) {
                ForEach(Array(presetGoals.enumerated()), id: \.offset) { index, g in
                    Button {
                        onSelect(g)
                    } label: {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("\(index + 1)")
                                .font(.custom("Bebas Neue", size: 32, relativeTo: .title))
                                .opacity(0.25)
                            Spacer()
                            Text(g.uppercased())
                                .font(.custom("Bebas Neue", size: 16, relativeTo: .body))
                                .tracking(0.5)
                                .multilineTextAlignment(.leading)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(16)
                        .frame(height: 140)
                        .background(EarthPalette.stepColors[index % 4])
                        .foregroundStyle(.white)
                    }
                }
            }
            .padding(.bottom, 24)

            // Custom input
            HStack(spacing: 0) {
                TextField("Or type your own goal...", text: $goal)
                    .font(.subheadline)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 12)
                    .background(EarthPalette.ink.opacity(0.03))
                    .overlay(
                        Rectangle()
                            .stroke(EarthPalette.ink.opacity(0.1), lineWidth: 1)
                    )
                    .onSubmit {
                        if !goal.trimmingCharacters(in: .whitespaces).isEmpty {
                            onSelect(goal)
                        }
                    }

                if !goal.trimmingCharacters(in: .whitespaces).isEmpty {
                    Button {
                        onSelect(goal)
                    } label: {
                        Text("NEXT")
                            .font(.system(size: 11, design: .monospaced))
                            .tracking(2)
                            .foregroundStyle(EarthPalette.bone)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 13)
                            .background(EarthPalette.ink)
                    }
                }
            }

            // Page indicator
            HStack {
                Spacer()
                Text("01 / 03")
                    .font(.system(size: 10, design: .monospaced))
                    .foregroundStyle(EarthPalette.ink.opacity(0.2))
            }
            .padding(.top, 32)
        }
    }
}
