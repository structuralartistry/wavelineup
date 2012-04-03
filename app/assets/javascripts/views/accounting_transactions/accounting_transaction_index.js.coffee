class Wavelineup.Views.AccountingTransactionsIndex extends Backbone.View

  render: ->
    source = $('#accounting_transaction_index').html()
    template = Handlebars.compile(source)
    data = { content: "something dynamic" }
    $('#container').html(template(data))

