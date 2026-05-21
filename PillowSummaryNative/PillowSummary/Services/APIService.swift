import Foundation

enum APIError: LocalizedError {
    case invalidURL
    case networkError(Error)
    case decodingError
    case serverError(String)

    var errorDescription: String? {
        switch self {
        case .invalidURL: return "Invalid URL"
        case .networkError(let e): return e.localizedDescription
        case .decodingError: return "Failed to parse response"
        case .serverError(let msg): return msg
        }
    }
}

final class APIService {
    static let shared = APIService()
    private let baseURL = "https://pillow-summary-web.vercel.app"

    func summarize(url: String, goal: String) async throws -> SummaryResult {
        guard let endpoint = URL(string: "\(baseURL)/api/summarize") else {
            throw APIError.invalidURL
        }

        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONEncoder().encode(SummarizeRequest(url: url, goal: goal))

        let (data, _) = try await URLSession.shared.data(for: request)

        struct ErrorResponse: Codable { let error: String }
        if let errorResp = try? JSONDecoder().decode(ErrorResponse.self, from: data) {
            throw APIError.serverError(errorResp.error)
        }

        guard let result = try? JSONDecoder().decode(SummaryResult.self, from: data) else {
            throw APIError.decodingError
        }

        return result
    }
}
