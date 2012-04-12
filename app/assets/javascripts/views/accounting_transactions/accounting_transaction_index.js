Wavelineup.Views.AccountingTransactionsIndex = Backbone.View.extend({
  el: '#container',

  template: JST['accounting_transactions/index'],

  events: {
    "click #new_accounting_transaction #save": 'create_accounting_transaction',
    'mousedown .accounting_transaction #t_type_id': 'show_selector'
  },

  show_selector: function(event) {
    // event.target is the calling object
    //   also can get coordinates - pageX/Y in this of calling object
    $('#a_selector').show();
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
      t_datetime: $('#new_accounting_transaction #t_datetime').val(),
      t_type_id: $('#new_accounting_transaction #t_type_id').html(),
      amount: $('#new_accounting_transaction #amount').val(),
      category_id: $('#new_accounting_transaction #category_id').val(),
      account_id: $('#new_accounting_transaction #account_id').val(),
      note: $('#new_accounting_transaction #note').val()
    };
    this.collection.create(attributes, {
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction accepted by server!');

        $('#new_accounting_transaction #t_datetime').val('');
        $('#new_accounting_transaction #t_type_id').html('');
        $('#new_accounting_transaction #amount').val('');
        $('#new_accounting_transaction #category_id').val('');
        $('#new_accounting_transaction #account_id').val('');
        $('#new_accounting_transaction #note').val('');
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
