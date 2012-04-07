class Wavelineup.Views.AccountingTransactionLineItem extends Backbone.View
  tagName: 'li'

  template: JST['accounting_transactions/accounting_transaction_line_item']

  events:
    'click .edit': 'edit'

  render: ->
    $(@el).html(@template(accounting_transaction: @model.toJSON()))
    this

  edit: (event) ->
    Backbone.history.navigate("accounting_transactions/edit/#{@model.get('id')}")
    $('#new_accounting_transaction').hide()
    view = new Wavelineup.Views.AccountingTransactionEdit(model: @model)
    $(".accounting_transaction_item[data-id='#{@model.get('id')}']").replaceWith(view.render().el)

