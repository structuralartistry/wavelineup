class Receivable < ActiveRecord::Base
  belongs_to :invoice

  attr_accessible :amount, :attributed_sale_identity_id, :balance_due, :billing_identity_id, :accounting_category_id, :invoice_id

  validates :practice_id, :amount, :accounting_category_id, :invoice_id, :presence => true
end
