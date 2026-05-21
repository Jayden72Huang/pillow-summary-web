import SwiftUI

struct AnalyzingView: View {
    let goal: String
    @State private var rotation: Double = 0

    var body: some View {
        VStack(spacing: 24) {
            Spacer()
                .frame(height: 100)

            Rectangle()
                .fill(EarthPalette.teal)
                .frame(width: 48, height: 48)
                .rotationEffect(.degrees(rotation))
                .onAppear {
                    withAnimation(.linear(duration: 2).repeatForever(autoreverses: false)) {
                        rotation = 360
                    }
                }

            Text("AI IS READING...")
                .font(.custom("Bebas Neue", size: 28, relativeTo: .title))
                .foregroundStyle(EarthPalette.ink)

            Text("Extracting key insights for your goal")
                .font(.subheadline)
                .foregroundStyle(EarthPalette.ink.opacity(0.4))

            Spacer()
        }
        .frame(maxWidth: .infinity)
    }
}
