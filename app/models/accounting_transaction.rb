class AccountingTransaction < ActiveRecord::Base
  belongs_to :practice
  belongs_to :invoice

  belongs_to :accounting_category, :class_name => 'OptionSelectorOption', :foreign_key => :accounting_category_id
  belongs_to :accounting_account, :class_name => 'OptionSelectorOption', :foreign_key => :accounting_account_id

  attr_accessible :date_time, :invoice_id, :income_expense, :accounting_account_id, :amount, :amount, :accounting_category_id, :date, :note, :receivable_id

  validates :date_time, :practice_id, :income_expense, :amount, :accounting_category_id, :accounting_account_id, :presence => true
end
