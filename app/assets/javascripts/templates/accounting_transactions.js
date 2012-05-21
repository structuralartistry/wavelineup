Wavelineup.Templates.AccountingTransactions = {
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
