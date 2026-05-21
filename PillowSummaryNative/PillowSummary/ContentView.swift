import SwiftUI

enum AppStep {
    case goal
    case url
    case analyzing
    case result
}

struct ContentView: View {
    @State private var step: AppStep = .goal
    @State private var goal = ""
    @State private var url = ""
    @State private var result: SummaryResult?
    @State private var errorMessage: String?

    let presetGoals = [
        "Learn React & frontend dev",
        "Understand AI & machine learning",
        "Improve writing skills",
        "Start a SaaS business",
    ]

    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                switch step {
                case .goal:
                    GoalView(
                        goal: $goal,
                        presetGoals: presetGoals,
                        onSelect: { selected in
                            goal = selected
                            withAnimation(.easeInOut(duration: 0.3)) {
                                step = .url
                            }
                        }
                    )
                case .url:
                    URLInputView(
                        url: $url,
                        goal: goal,
                        onBack: {
                            withAnimation { step = .goal }
                        },
                        onSubmit: { summarize() }
                    )
                case .analyzing:
                    AnalyzingView(goal: goal)
                case .result:
                    if let result {
                        ResultView(
                            result: result,
                            goal: goal,
                            onReset: {
                                url = ""
                                self.result = nil
                                errorMessage = nil
                                withAnimation { step = .url }
                            }
                        )
                    }
                }
            }
            .padding(.horizontal, 24)
            .padding(.top, 20)
        }
        .background(EarthPalette.bone.ignoresSafeArea())
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil; step = .url }
        } message: {
            Text(errorMessage ?? "")
        }
    }

    private func summarize() {
        withAnimation { step = .analyzing }
        Task {
            do {
                let res = try await APIService.shared.summarize(url: url, goal: goal)
                await MainActor.run {
                    result = res
                    withAnimation { step = .result }
                }
            } catch {
                await MainActor.run {
                    result = SummaryResult(
                        title: "Unable to fetch this URL",
                        summary: "We couldn't access this page. Try a different article URL.",
                        keyInsights: ["Try a blog post, news article, or YouTube video URL"],
                        relevanceScore: 0,
                        readTime: "-",
                        platform: "unknown"
                    )
                    withAnimation { step = .result }
                }
            }
        }
    }
}
