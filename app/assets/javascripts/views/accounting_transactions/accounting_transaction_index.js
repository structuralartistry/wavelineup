Wavelineup.Views.AccountingTransactionsIndex = Backbone.View.extend({
  el: '#container',

  template: JST['accounting_transactions/index'],

  events: {
    "click .accounting_transaction[data-id='new'] #save": 'create_accounting_transaction',
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
      t_datetime: $(".accounting_transaction[data-id='new'] #t_datetime").val(),
      t_type_id: $(".accounting_transaction[data-id='new'] #t_type_id").html(),
      amount: $(".accounting_transaction[data-id='new'] #amount").val(),
      category_id: $(".accounting_transaction[data-id='new'] #category_id").val(),
      account_id: $(".accounting_transaction[data-id='new'] #account_id").val(),
      note: $(".accounting_transaction[data-id='new'] #note").val()
    };
    this.collection.create(attributes, {
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction accepted by server!');

        $(".accounting_transaction[data-id='new'] #t_datetime").val('');
        $(".accounting_transaction[data-id='new'] #t_type_id").html('');
        $(".accounting_transaction[data-id='new'] #amount").val('');
        $(".accounting_transaction[data-id='new'] #category_id").val('');
        $(".accounting_transaction[data-id='new'] #account_id").val('');
        $(".accounting_transaction[data-id='new'] #note").val('');
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
