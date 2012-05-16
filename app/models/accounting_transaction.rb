class AccountingTransaction < ActiveRecord::Base
  belongs_to :practice
  belongs_to :invoice

  belongs_to :category, :class_name => 'OptionSelectorOption', :foreign_key => :category_id
  belongs_to :account, :class_name => 'OptionSelectorOption', :foreign_key => :account_id

  attr_accessible :date_time, :invoice_id, :income_expense, :account_id, :amount, :amount, :category_id, :date, :note, :receivable_id

  validates :date_time, :practice_id, :income_expense, :amount, :category_id, :account_id, :presence => true
end
