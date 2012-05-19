require 'test_helper'

class AccountingTransactionsControllerTest < ActionController::TestCase

  context 'pagination' do

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

  end

  context 'search' do

    context 'field specific' do

      should 'find by date_time' do

      end

      should 'find by income_expense' do

      end

      should 'find by amount' do
        # non matching
        3.times do
          Factory(:accounting_transaction, :amount => 1111)
        end

        match_one = Factory(:accounting_transaction, :amount => 2222)
        match_two = Factory(:accounting_transaction, :amount => 2222)

        %w(22 22.22 $22.22).each do |value_string|
          get :index, { :format => :json, :search => value_string }

          response_json = JSON.parse(response.body)

          assert response_json.length == 2
          response_json.each { |r| assert [match_one.id, match_two.id].include?(r['id']) }
        end
      end

      should 'find by category name' do
        # non matching
        option_selector_option = Factory(:option_selector_option)
        3.times do
          Factory(:accounting_transaction, :accounting_category_id => option_selector_option.id)
        end

        option_selector_option = Factory(:option_selector_option, :value => 'Office Supplies')
        match_one = Factory(:accounting_transaction, :accounting_category_id => option_selector_option.id)
        match_two = Factory(:accounting_transaction, :accounting_category_id => option_selector_option.id)

        get :index, { :format => :json, :search => 'office supp' }

        response_json = JSON.parse(response.body)

        assert response_json.length == 2
        response_json.each { |r| assert [match_one.id, match_two.id].include?(r['id']) }
      end

      should 'find by account name' do
        # non matching
        option_selector_option = Factory(:option_selector_option)
        3.times do
          Factory(:accounting_transaction, :accounting_account_id => option_selector_option.id)
        end

        option_selector_option = Factory(:option_selector_option, :value => 'Business Checking')
        match_one = Factory(:accounting_transaction, :accounting_category_id => option_selector_option.id)
        match_two = Factory(:accounting_transaction, :accounting_category_id => option_selector_option.id)

        get :index, { :format => :json, :search => 'checkin' }

        response_json = JSON.parse(response.body)

        assert response_json.length == 2
        response_json.each { |r| assert [match_one.id, match_two.id].include?(r['id']) }

      end

      should 'find by note' do

      end

      should 'find by invoice_id' do

      end

    end

  end

# Wavelineup.instance.collections.accounting_transactions.fetch({data: {page_size: 15, page_number: 12}})
end
