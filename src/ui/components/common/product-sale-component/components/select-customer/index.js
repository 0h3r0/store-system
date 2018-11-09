// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import SelectUserDialog from './components/SelectUserDialog';

import ActionButton from '../../../ActionButton';
import Input from '../../../CustomInput';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

const InputWrapper = styled.div`
  width: 40%;
  margin-right: 16px;
`;

const InputButtonWrapper = styled.div`
  display: flex;
  align-self: center;
  margin-bottom: ${({ hasError }) => (hasError ? 20 : 0)}px;
`;

type Props = {
  customerSelected: Object,
  setFieldValue: Function,
  error: Object,
  mode: string,
};

type State = {
  isDialogOpen: boolean,
};

class SelectCustomer extends Component<Props, State> {
  state = {
    isDialogOpen: false,
  };

  onToggleDialogChooseCustomer = (): void => {
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
    });
  };

  onSelectCustomer = (customer: Object): void => {
    const { setFieldValue } = this.props;

    setFieldValue('customer', customer);
  };

  renderInputField = (): Object => {
    const { customerSelected, error } = this.props;
    const value = (typeof customerSelected === 'object' ? customerSelected.name : customerSelected);

    return (
      <Input
        placeholder="Selecione o Cliente"
        onChange={() => {}}
        onBlur={() => {}}
        error={error}
        value={value}
        id="customer"
        type="text"
        label=""
        disabled
      />
    );
  };

  renderSelectCustomerButton = (): Object => {
    const { customerSelected, mode, error } = this.props;

    const isCustomerValidString = (typeof customerSelected === 'string' && !!customerSelected);
    const hasCustomerSelected = (isCustomerValidString || !!customerSelected.name);
    const actionButtonTitle = (hasCustomerSelected ? 'EDITAR' : 'SELECIONAR');

    return (
      <InputButtonWrapper
        hasError={!!error}
      >
        <ActionButton
          action={() => this.onToggleDialogChooseCustomer()}
          disabled={mode === 'detail'}
          title={actionButtonTitle}
          withIcon={false}
        />
      </InputButtonWrapper>
    );
  };

  renderDialog = (): Object => {
    const { customerSelected } = this.props;
    const { isDialogOpen } = this.state;

    return (
      <SelectUserDialog
        onToggle={() => this.onToggleDialogChooseCustomer()}
        onSelectCustomer={this.onSelectCustomer}
        customerSelected={customerSelected}
        isOpen={isDialogOpen}
      />
    );
  };

  render() {
    return (
      <Wrapper>
        <InputWrapper>
          {this.renderInputField()}
        </InputWrapper>
        {this.renderSelectCustomerButton()}
        {this.renderDialog()}
      </Wrapper>
    );
  }
}

export default SelectCustomer;