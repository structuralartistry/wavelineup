# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if Rails.env == 'development'
  AccountingTransaction.create( :date_time => '2012-01-01 13:00',
                                :credit_debit_id => 1,
                                :amount => 11.11,
                                :category_id => 11,
                                :account_id => 111,
                                :note => 'blah' )
end

option_selector = OptionSelector.create(:name => 'credit_debit', :include_blank => true, :include_cancel => true)
OptionSelectorValue.create(:option_selector_id => option_selector.id, :key => '1', :value => 'Income')
OptionSelectorValue.create(:option_selector_id => option_selector.id, :key => '2', :value => 'Expense')

