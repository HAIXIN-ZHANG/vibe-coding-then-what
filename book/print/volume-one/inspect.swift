import Foundation
import PDFKit

guard CommandLine.arguments.count == 3,
      let doc = PDFDocument(url: URL(fileURLWithPath: CommandLine.arguments[1])),
      doc.pageCount > 0 else { fatalError("Cannot open PDF") }
func destination(_ target: PDFDestination) -> [String: Any]? {
    guard let page = target.page else { return nil }
    return ["page": doc.index(for: page) + 1, "x": target.point.x, "y": target.point.y]
}
func outline(_ root: PDFOutline) -> [[String: Any]] {
    (0..<root.numberOfChildren).compactMap { idx in
        guard let item = root.child(at: idx), let label = item.label else { return nil }
        var row = item.destination.flatMap(destination) ?? [:]
        row["label"] = label
        row["children"] = outline(item)
        return row
    }
}
let pages: [[String: Any]] = (0..<doc.pageCount).map { index in
    let page = doc.page(at: index)!
    let box = page.bounds(for: .mediaBox)
    let text = page.string ?? ""
    let footer = "\(index + 1) / \(doc.pageCount)"
    let printedFooter = text.split(separator: "\n").map { $0.trimmingCharacters(in: .whitespaces) }.contains(footer)
    let links: [[String: Any]] = page.annotations.filter { $0.type == "Link" }.compactMap { link in
        let box = link.bounds
        var row: [String: Any] = ["x": box.minX, "y": box.maxY, "w": box.width, "h": box.height]
        if let target = link.destination ?? (link.action as? PDFActionGoTo)?.destination {
            row["destination"] = destination(target)
        } else if let target = (link.action as? PDFActionURL)?.url?.absoluteString {
            row["url"] = target
        }
        row["label"] = page.selection(for: box.insetBy(dx: -0.8, dy: -0.8))?.string ?? ""
        return row
    }
    return ["page": index + 1, "widthPt": box.width, "heightPt": box.height, "footerValid": printedFooter, "text": text, "links": links]
}
let output: [String: Any] = ["pageCount": doc.pageCount, "pages": pages, "outline": doc.outlineRoot.map(outline) ?? []]
let data = try JSONSerialization.data(withJSONObject: output, options: [.prettyPrinted, .sortedKeys])
try data.write(to: URL(fileURLWithPath: CommandLine.arguments[2]), options: .atomic)
