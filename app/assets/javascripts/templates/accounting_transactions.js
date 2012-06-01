Wavelineup.Templates.AccountingTransactions = {

  list: function (json) {
    var t = " \
      <h1>Hello World Index View from Backbone!!!</h1> \
      <input class='new_accounting_transaction expense btn' type='submit' value='New Expense'> \
      <input class='new_accounting_transaction income btn' type='submit' value='New Income'> \
      <table id='accounting_transactions' class='table table-striped table-bordered table-condensed'> \
        <thead> \
          <tr> \
            <th>Date Time</th> \
            <th>Income/Expense</th> \
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
      <p>Showing <%= page_record_start %> to <%= page_record_end %> of <%= total_record_count %> entries</p> \
      <input class='accounting_transactions paginate_previous btn' type='submit' value='<< Previous'> \
      <input class='accounting_transactions paginate_next btn' type='submit' value='Next >>'>"
    return _.template(t,json);
  },

  list_item: function (json) {
    var t = " \
      <td><%= date_time %></td> \
      <td><%= income_expense %></td> \
      <td><%= amount %></td> \
      <td><%= accounting_category_value %></td> \
      <td><%= accounting_account_value %></td> \
      <td><%= note %></td>"

    if(json.invoice_id==null) {
      t += "<td><input class='edit' type='submit' value='Edit'></td>";
    } else {
      t += "<td><input class='view_invoice' type='submit' value='Invoice'></td>";
    }

    return _.template(t,json);
  },

  accounting_transaction: function(json) {
    var t = " \
      <div class='modal-header'> \
        <button class='close' data-dismiss='modal'>×</button> \
        <h3>Modal header</h3> \
        <div id='modal_notices'></div> \
      </div> \
      <div class='modal-body'> \
        <ul id='accounting_transaction_new_edit'> \
          <li><input type='text' id='date_time' value='<%= date_time %>'></li> \
          <li><input type='text' id='amount' value='<%= amount %>'></li> \
          <li id='income_expense'><%= income_expense %></li> \
          <li><a id='accounting_category_id' class='btn option_selector target' data-option_selector_name='accounting_category_<%= income_expense %>' data-set_id='<%= accounting_category_id %>' data-set_value=''><%= accounting_category_value %></a></li> \
          <li><a id='accounting_account_id' class='btn option_selector target' data-option_selector_name='accounting_account' data-set_id='<%= accounting_account_id %>' data-set_value=''><%= accounting_account_value %></a></li> \
          <li><input type='text' id='note' value='<%= note %>'></li> \
        </ul> \
      </div> \
      <div class='modal-footer'> \
        <input class='save btn-primary' type='submit' value='Save'> \
        <input class='delete btn-danger' type='submit' value='Delete'> \
        <input class='cancel btn' type='submit' value='Cancel'> \
      </div>"
    return _.template(t,json);
  }
}
