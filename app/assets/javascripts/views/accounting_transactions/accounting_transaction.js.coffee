class Wavelineup.Views.AccountingTransaction extends Backbone.View
  tagName: 'li'

  template: JST['accounting_transactions/accounting_transaction']

  events:
    'click .edit': 'edit'
    'submit .accounting_transaction_item .edit': 'update_accounting_transaction'

  initialize: ->
    _.bindAll(this, 'render')
    @model.bind('change', @render, this)

  temp: ->
    console.log 'called'

  render: ->
    $(@el).html(@template(accounting_transaction: @model.toJSON()))
    this

  edit: (event) ->
    $('#new_accounting_transaction').hide()
    $(".accounting_transaction_item[data-id='#{@model.get('id')}'] .detail").hide()
    $(".accounting_transaction_item[data-id='#{@model.get('id')}'] .edit").show()

  update_accounting_transaction: ->
    event.preventDefault()
    accounting_transaction_wrapper = ".accounting_transaction_item[data-id='#{@model.get('id')}']"
    attributes =
      t_datetime: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_t_datetime").val(),
      t_type_id: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_t_type_id").val(),
      amount: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_amount").val(),
      category_id: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_category_id").val(),
      account_id: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_account_id").val(),
      note: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_note").val()

    # we are saving a model here... instead of doing the success logic here, would like it to be a callback somewhere else
    #  do we want the model to trigger the changes -- no, the model does not care or determine the view, so no
    #  so this logic should be in the view, so it is rightly here but maybe in other method?
    #    we just really want to re-render the specific AT view upon success
    #      like in the AT index view, we have @collection.on('add') callback...
    #      here we want something like that but on the model save... going to try now...
    @model.save(attributes,
      wait: true,
      success: ->
        $('#notices').html('Accounting Transaction updated by server!')
        $('#new_accounting_transaction').show()
      error: ->
        @handle_error
    )
