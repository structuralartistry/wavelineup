require 'test_helper'

class MainControllerTest < ActionController::TestCase

  test "should get index" do
    get :index
    assert_response :success
  end

  context 'rabl manual render' do

    should 'include expected fields for AccountingTransaction' do
      full_accounting_transaction = Factory(:accounting_transaction,
                                            :practice_id => '',
                                            :date_time => '',
                                            :income_expense => '',
                                            :amount => '',
                                            :accounting_category_id => '',
                                            :accounting_account_id => '',
                                            :note => '',
                                            :invoice_id => '',
                                            :receivable_id => '')


      10.times { Factory(:accounting_transaction) }
      accounting_transactions = AccountingTransaction.all
      accounting_transactions_json = Rabl::Renderer.json(accounting_transactions, 'accounting_transactions/index', :view_path => 'app/views')
      assert accounting_transactions_json.length = 10

    end

  end

end
