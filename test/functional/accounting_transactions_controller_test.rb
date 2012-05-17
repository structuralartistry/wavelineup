require 'test_helper'

class AccountingTransactionsControllerTest < ActionController::TestCase

  should 'return 15 records and first page if no pagination information supplied' do
    50.times do
      Factory(:accounting_transaction)
    end
    get :index, :format => :json

    response_json = JSON.parse(response.body)
    assert response_json.length == 15
    expected_ids = AccountingTransaction.select('id, date_time').order('date_time DESC').limit(15).map(&:id).sort
    response_json.each { |r| assert expected_ids.include?(r['id']) }
  end

  should 'return the requested page of records and expected number of records if pagination info submitted' do
    # note default sort is date_time
    now = DateTime.now
    n = 0
    50.times do
      Factory(:accounting_transaction, :date_time => (now + n.days))
      n+=1
    end

    # first page, page size 15
    get :index, { :format => :json, :page_size => 15, :page_number => 1 }

    response_json = JSON.parse(response.body)
    assert response_json.length == 15
    expected_ids = AccountingTransaction.select('id, date_time').order('date_time DESC').limit(15).map(&:id).sort
    response_json.each { |r| assert expected_ids.include?(r['id']) }

    # third page, page size 15
    get :index, { :format => :json, :page_size => 15, :page_number => 3 }

    response_json = JSON.parse(response.body)
    assert response_json.length == 15
    expected_ids = AccountingTransaction.select('id, date_time').order('date_time DESC').limit(15).offset(30).map(&:id).sort
    response_json.each { |r| assert expected_ids.include?(r['id']) }

    # fith page, page size 5
    get :index, { :format => :json, :page_size => 5, :page_number => 5 }

    response_json = JSON.parse(response.body)
    assert response_json.length == 5
    expected_ids = AccountingTransaction.select('id, date_time').order('date_time DESC').limit(5).offset(20).map(&:id).sort
    response_json.each { |r| assert expected_ids.include?(r['id']) }
  end

# Wavelineup.instance.collections.accounting_transactions.fetch({data: {page_size: 15, page_number: 12}})

  # test "the truth" do
  #   assert true
  # end
end
