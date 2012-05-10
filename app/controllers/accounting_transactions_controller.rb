class AccountingTransactionsController < ApplicationController
  respond_to :json

  def index
    @accounting_transactions = AccountingTransaction.all
    render :template => 'accounting_transactions/index'
  end

  def create
    @accounting_transaction = AccountingTransaction.new(params[:accounting_transaction])
    if @accounting_transaction.save
      render :template => 'accounting_transactions/accounting_transaction', :status => 201
    else
      render :template => 'accounting_transactions/accounting_transaction', :status => 422
    end
  end

  def update
    @accounting_transaction = AccountingTransaction.update_attributes(params[:accounting_transaction])
    if @accounting_transaction.save
      render :template => 'accounting_transactions/accounting_transaction', :status => 202
    else
      render :template => 'accounting_transactions/accounting_transaction', :status => 422
    end
  end

  def destroy
    @accounting_transaction = AccountingTransaction.find(params[:id])
    if @accounting_transaction.destroy
      render :template => 'accounting_transactions/accounting_transaction', :status => 202
    else
      render :template => 'accounting_transactions/accounting_transaction', :status => 422
    end
  end

end
