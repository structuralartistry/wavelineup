require 'test_helper'

class AccountingTransactionTest < ActiveSupport::TestCase
  should belong_to :practice
  should belong_to :invoice

  should belong_to :accounting_category
  should belong_to :accounting_account

  should validate_presence_of :date_time
  should validate_presence_of :practice_id
  should validate_presence_of :income_expense
  should validate_presence_of :amount
  should validate_presence_of :accounting_category_id
  should validate_presence_of :accounting_account_id

  context 'pagination' do

    should 'return 15 records and first page if no pagination information supplied' do
      50.times do
        Factory(:accounting_transaction)
      end

      accounting_transactions = AccountingTransaction.paginate

      assert accounting_transactions.length == 15

      expected_ids = AccountingTransaction.select('id, date_time').order('date_time DESC').limit(15).map(&:id).sort
      accounting_transactions.each { |r| assert expected_ids.include?(r.id) }
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
      accounting_transactions = AccountingTransaction.paginate({:page_size => 15, :page_number => 1})

      assert accounting_transactions.length == 15
      expected_ids = AccountingTransaction.select('id, date_time').order('date_time DESC').limit(15).map(&:id).sort
      accounting_transactions.each { |r| assert expected_ids.include?(r.id) }

      # third page, page size 15
      accounting_transactions = AccountingTransaction.paginate({:page_size => 15, :page_number => 3})

      assert accounting_transactions.length == 15
      expected_ids = AccountingTransaction.select('id, date_time').order('date_time DESC').limit(15).offset(30).map(&:id).sort
      accounting_transactions.each { |r| assert expected_ids.include?(r.id) }

      # fith page, page size 5
      accounting_transactions = AccountingTransaction.paginate({:page_size => 5, :page_number => 5})

      assert accounting_transactions.length == 5
      expected_ids = AccountingTransaction.select('id, date_time').order('date_time DESC').limit(5).offset(20).map(&:id).sort
      accounting_transactions.each { |r| assert expected_ids.include?(r.id) }
    end

  end

  context 'search' do

    context 'field specific' do

      should 'find by date_time' do
# date time format
# 2011-05-29 16:41
        # non matching
        3.times do
          Factory(:accounting_transaction, :date_time => DateTime.parse('2009-08-04 09:00'))
        end

        match = Factory(:accounting_transaction, :date_time => DateTime.parse('2012-05-29 16:42'))

        ['2012-05', '2012-05-29', '16:42'].each do |value_string|
          accounting_transactions = AccountingTransaction.search(value_string)

          assert accounting_transactions.length == 1
          assert accounting_transactions.first.id == match.id
        end

      end

      should 'find by income_expense' do
        # non matching
        3.times do
          Factory(:accounting_transaction, :income_expense => 'expense')
        end

        match_one = Factory(:accounting_transaction, :income_expense => 'income')
        match_two = Factory(:accounting_transaction, :income_expense => 'income')

        accounting_transactions = AccountingTransaction.search('income')

        assert accounting_transactions.length == 2
        accounting_transactions.each { |r| assert [match_one.id, match_two.id].include?(r.id) }
      end

      should 'find by amount' do
        # non matching
        3.times do
          Factory(:accounting_transaction, :amount => 1111)
        end

        match_one = Factory(:accounting_transaction, :amount => 2222)
        match_two = Factory(:accounting_transaction, :amount => 2222)

        %w(22.22 $22.22).each do |value_string|
          accounting_transactions = AccountingTransaction.search(value_string)

          assert accounting_transactions.length == 2
          accounting_transactions.each { |r| assert [match_one.id, match_two.id].include?(r.id) }
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

        accounting_transactions = AccountingTransaction.search('office supp')

        assert accounting_transactions.length == 2
        accounting_transactions.each { |r| assert [match_one.id, match_two.id].include?(r.id) }
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

        accounting_transactions = AccountingTransaction.search('checkin')

        assert accounting_transactions.length == 2
        accounting_transactions.each { |r| assert [match_one.id, match_two.id].include?(r.id) }

      end

      should 'find by note' do
        # non matching
        option_selector_option = Factory(:option_selector_option)
        3.times do
          Factory(:accounting_transaction, :accounting_category_id => option_selector_option.id)
        end

        match = Factory(:accounting_transaction, :note => 'some data')

        accounting_transactions = AccountingTransaction.search('some data')

        assert accounting_transactions.length == 1

        # expected fields
        accounting_transaction = accounting_transactions.first
        assert accounting_transaction.practice_id == match.practice_id
        assert accounting_transaction.date_time.strftime('%m%d%y') == match.date_time.strftime('%m%d%y')
        assert accounting_transaction.income_expense == match.income_expense
        assert accounting_transaction.amount == match.amount
        assert accounting_transaction.accounting_category_id == match.accounting_category_id
        assert accounting_transaction.accounting_account_id == match.accounting_account_id
        assert accounting_transaction.note == match.note
        assert accounting_transaction.invoice_id == match.invoice_id
        assert accounting_transaction.receivable_id == match.receivable_id
      end

      should 'find by invoice_id' do
        # non matching
        option_selector_option = Factory(:option_selector_option)
        3.times do
          Factory(:accounting_transaction, :accounting_category_id => option_selector_option.id)
        end

        match = Factory(:accounting_transaction, :invoice_id => 99722)

        accounting_transactions = AccountingTransaction.search('99722')

        assert accounting_transactions.length == 1
        assert accounting_transactions.first.id == match.id
      end

    end

  end

# Wavelineup.instance.collections.accounting_transactions.fetch({data: {page_size: 15, page_number: 12}})
end
