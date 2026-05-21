import Foundation

struct SummaryResult: Codable, Identifiable {
    var id: String { title }
    let title: String
    let summary: String
    let keyInsights: [String]
    let relevanceScore: Int
    let readTime: String
    let platform: String
}

struct SummarizeRequest: Codable {
    let url: String
    let goal: String
}
