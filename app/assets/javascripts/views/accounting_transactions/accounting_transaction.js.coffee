class Wavelineup.Views.AccountingTransaction extends Backbone.View
  tagName: 'li'

  template: JST['accounting_transactions/accounting_transaction']

  events:
    'click .accounting_transaction_wrapper .detail .edit': 'edit'
    'click .accounting_transaction_wrapper .detail .delete': 'delete'
    'submit .accounting_transaction_wrapper .edit': 'update_accounting_transaction'

  initialize: ->
    _.bindAll(this, 'render')
    @model.bind('change', @render, this)
    @model.bind('destroy', @delete_accounting_transaction_wrapper, this)

  delete_accounting_transaction_wrapper: ->
    $(@el).remove()

  render: ->
    $(@el).html(@template(accounting_transaction: @model.toJSON()))
    this

  edit: (event) ->
    $('#new_accounting_transaction').hide()
    $(".accounting_transaction_wrapper[data-id='#{@model.get('id')}'] .detail").hide()
    $(".accounting_transaction_wrapper[data-id='#{@model.get('id')}'] .edit").show()

  delete: (event) ->
    event.preventDefault()
    @model.destroy(
      wait: true,
      success: ->
        $('#notices').html('Accounting Transaction deleted by server!')
      error: @handle_error
    )

  update_accounting_transaction: ->
    event.preventDefault()
    accounting_transaction_wrapper = ".accounting_transaction_wrapper[data-id='#{@model.get('id')}']"
    attributes =
      t_datetime: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_t_datetime").val(),
      t_type_id: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_t_type_id").val(),
      amount: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_amount").val(),
      category_id: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_category_id").val(),
      account_id: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_account_id").val(),
      note: $("#{accounting_transaction_wrapper} .edit #accounting_transaction_note").val()
    @model.save(attributes,
      wait: true,
      success: ->
        $('#notices').html('Accounting Transaction updated by server!')
        $('#new_accounting_transaction').show()
      error: @handle_error
    )

  handle_error: (model, response) ->
    if response.status == 422
      $('#notices').html('')
      errors = $.parseJSON(response.responseText).errors
      for attribute, messages of errors
        for message in messages
          $('#notices').append("#{attribute} #{message}<br>" )
