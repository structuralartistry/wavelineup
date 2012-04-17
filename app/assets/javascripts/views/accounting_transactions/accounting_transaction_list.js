Wavelineup.Views.AccountingTransactionsList = Backbone.View.extend({
  el: '#content',

  template: JST['accounting_transactions/list'],

  events: {
    'mousedown #accounting_transaction__new__button': 'new_accounting_transaction',
    'mousedown .show_selector': 'show_selector',
    'mousedown .selected_value': 'set_selected_value'
  },

  new_accounting_transaction: function(event) {
    Wavelineup.Routers.main.navigate('accounting_transactions/new', true);
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

    // datatable
    $("#accounting_transactions tbody tr").click( function(event) {
      Wavelineup.Routers.main.navigate('accounting_transactions/' + $(this).attr('id'), {trigger: true});
    });
    oTable = $('#accounting_transactions').dataTable( {
      "aaSorting": [[ 4, "desc" ]]
    });

    return this.el;
  },

  append_accounting_transaction: function(accounting_transaction) {
    view = new Wavelineup.Views.AccountingTransactionListItem({model: accounting_transaction});
    $('#accounting_transactions tbody').append(view.render().el);
  },

});
