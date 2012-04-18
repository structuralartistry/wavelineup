Wavelineup.Views.AccountingTransactionsList = Backbone.View.extend({
  el: '#content',

  template: function(json) {
    var t = " \
      <div id='notices'></div> \
      <h1>Hello World Index View from Backbone!!!</h1> \
      <input id='accounting_transaction__new__button' type='submit' value='New'> \
      <table id='accounting_transactions'> \
        <thead> \
          <tr> \
            <th>Date Time</th> \
            <th>Credit/Debit</th> \
            <th>Amount</th> \
            <th>Category</th> \
            <th>Account</th> \
            <th>Note</th> \
            <th>Edit</th> \
          </tr> \
        </thead> \
        <tbody> \
        </tbody> \
      </table> \
      <style> \
        ul.selector li { \
          display: inline-block; \
          border: solid 1px black;  \
          width: 1.5in;  \
          height: 0.25in; \
          list-style-type: none; \
        } \
        #a_selector { \
          display: none; \
        } \
      </style> \
      <ul class='selector' id='a_selector'> \
        <li id='button_one' class='selected_value' data-value='1'>1</li> \
        <li id='button_two' class='selected_value' data-value='2'>2</li> \
      </ul>"
    return _.template(t,json);
  },

  events: {
    'mousedown #accounting_transaction__new__button': 'new_accounting_transaction',
    'mousedown .show_selector': 'show_selector',
    'mousedown .selected_value': 'set_selected_value'
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
    oTable = $('#accounting_transactions').dataTable( {
      "aaSorting": [[ 4, "desc" ]]
    });

    return this.el;
  },

  new_accounting_transaction: function(event) {
    Wavelineup.Controllers.AccountingTransactions.neww();
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

  append_accounting_transaction: function(accounting_transaction) {
    view = new Wavelineup.Views.AccountingTransactionListItem({model: accounting_transaction});
    $('#accounting_transactions tbody').append(view.render().el);
  },

});
