import * as RecipientServices from '../../src/services/recipientService'


it("should run add without  errors", () => {

    RecipientServices.recipientService.add("", true)

})

it("should  run edit without  errors", () => {
    RecipientServices.recipientService.edit({ _id: "1234" })

})

it("should run addTag without  errors", () => {
    RecipientServices.recipientService.addTag("tag")
})

it("should run addTagsToRecipient without  errors", () => {
    RecipientServices.recipientService.addTagsToRecipient("", "tag")
})

it("should run fetch without  errors", () => {
    RecipientServices.recipientService.fetch()
})

it("should run search without  errors", () => {
    RecipientServices.recipientService.search("search text", "filter")
})

it("should run deleteRecipient without  errors", () => {
    RecipientServices.recipientService.deleteRecipient("")
})

it("should run deleteTag without  errors", () => {
    RecipientServices.recipientService.deleteTag("tag")
})

it("should run fetchPage without  errors", () => {
    RecipientServices.recipientService.fetchPage("page")
})

it("should run fetchTags without  errors", () => {
    RecipientServices.recipientService.fetchTags()
})