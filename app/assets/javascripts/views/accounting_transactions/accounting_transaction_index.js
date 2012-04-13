Wavelineup.Views.AccountingTransactionsIndex = Backbone.View.extend({
  el: '#container',

  template: JST['accounting_transactions/index'],

  events: {
    "click #accounting_transaction__save__new": 'create_accounting_transaction',
    'mousedown .show_selector': 'show_selector',
    'mousedown .selected_value': 'set_selected_value'
  },

  show_selector: function(event) {
    // event.target is the calling object
    //   also can get coordinates - pageX/Y in this of calling object
    selector_id = $(event.target).data('selector_id');
    //$('#' + selector_id).data('model', $(event.target).data('model'));
    //$('#' + selector_id).data('record_id', $(event.target).data('record_id'));
    //$('#' + selector_id).data('field', $(event.target).data('field'));
    $('#' + selector_id).data('caller_id', $(event.target).attr('id'));
    $('#' + selector_id).show();
  },

  set_selected_value: function(event) {
    selector_element = $(event.target).closest('.selector');
    caller_id = $(selector_element).data('caller_id');
    $('#' + caller_id).html($(event.target).data('value'));
    $(selector_element).hide();
  },

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.append_accounting_transaction, this);
  },

  render: function() {
    data = { accounting_transactions: this.collection.toJSON() };
    $(this.el).html(this.template(data));
    this.collection.each(this.append_accounting_transaction);
    return this.el;
  },

  append_accounting_transaction: function(accounting_transaction) {
    view = new Wavelineup.Views.AccountingTransaction({model: accounting_transaction});
    $('#accounting_transactions').append(view.render().el);
  },

  create_accounting_transaction: function(event) {
    event.preventDefault();
    attributes = {
      date_time: $('#accounting_transaction__date_time__new').val(),
      credit_debit_id: $('#accounting_transaction__credit_debit_id__new').html(),
      amount: $('#accounting_transaction__amount__new').val(),
      category_id: $('#accounting_transaction__category_id__new').val(),
      account_id: $('#accounting_transaction__account_id__new').val(),
      note: $('#accounting_transaction__note__new').val()
    };
    this.collection.create(attributes, {
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction accepted by server!');

        $('#accounting_transaction__date_time__new').val('');
        $('#accounting_transaction__credit_debit_id__new').html('');
        $('#accounting_transaction__amount__new').val('');
        $('#accounting_transaction__category_id__new').val('');
        $('#accounting_transaction__account_id__new').val('');
        $('#accounting_transaction__note__new').val('');
      },
      error: function(model, response) {
        var attribute, errors, message, messages, _i, _len;
        if (response.status === 422) {
          $('#notices').html('');
          errors = $.parseJSON(response.responseText).errors;
          Wavelineup.write_model_errors_to_screen(errors);
        }
      }
    })
  }
});
