import * as DocumentServices from '../../src/services/documentService'



it("should run fetch func", () => {

    DocumentServices.documentService.fetch()

})

it("should run fetchSingle func", () => {
    DocumentServices.documentService.fetchSingle()
})

it("should run fetchPage without errors", () => {
    DocumentServices.documentService.fetchPage()
})

it("should run signDocument without error", () => {
    DocumentServices.documentService.signDocument()
})

