# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if Rails.env == 'development'
  practice = Practice.create( :name => 'Demo Practice' )

  accounting_transaction = AccountingTransaction.new( :date_time => '2012-01-01 13:00',
                                                      :credit_debit_key => '1',
                                                      :amount => 1111,
                                                      :category_key => '1',
                                                      :account_key => '1',
                                                      :note => 'blah' )
  accounting_transaction.practice_id = practice.id
  accounting_transaction.save

  invoice = Invoice.new( :date_time => '2012-01-01 13:00',
                         :note => 'blah' )
  invoice.practice_id = practice.id
  invoice.save
end

option_selector = OptionSelector.create(:name => 'accounting_credit_debit')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '1', :value => 'Income')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '2', :value => 'Expense')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'blank', :value => '')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'cancel', :value => 'Cancel')

option_selector = OptionSelector.create(:name => 'accounting_category')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '1', :value => 'Cafe')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '2', :value => 'Dining')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '3', :value => 'Groceries')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '4', :value => 'Rent')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '5', :value => 'Utilities')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'blank', :value => '')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'cancel', :value => 'Cancel')

option_selector = OptionSelector.create(:name => 'accounting_account')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '1', :value => 'B of A CC')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '2', :value => 'Cash')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '3', :value => 'CHAP')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => '4', :value => 'Zions')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'blank', :value => '')
OptionSelectorOption.create(:option_selector_id => option_selector.id, :key => 'cancel', :value => 'Cancel')
