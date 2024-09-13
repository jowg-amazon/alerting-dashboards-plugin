/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import _ from 'lodash';
import {
  EuiCompressedFieldSearch,
  EuiFlexGroup,
  EuiCompressedSelect,
  EuiFlexItem,
  EuiPagination,
} from '@elastic/eui';
import { ALERT_STATE, MONITOR_TYPE } from '../../../../utils/constants';

const severityOptions = [
  { value: 'ALL', text: 'All severity levels' },
  { value: '1', text: '1 (Highest)' },
  { value: '2', text: '2 (High)' },
  { value: '3', text: '3 (Medium)' },
  { value: '4', text: '4 (Low)' },
  { value: '5', text: '5 (Lowest)' },
];

const stateOptions = [
  { value: 'ALL', text: 'All alerts' },
  { value: ALERT_STATE.ACTIVE, text: 'Active' },
  { value: ALERT_STATE.ACKNOWLEDGED, text: 'Acknowledged' },
  { value: ALERT_STATE.COMPLETED, text: 'Completed' },
  { value: ALERT_STATE.ERROR, text: 'Error' },
  { value: ALERT_STATE.DELETED, text: 'Deleted' },
];

const DashboardControls = ({
  activePage,
  pageCount,
  search,
  severity = severityOptions[0],
  state = stateOptions[0],
  onSearchChange,
  onSeverityChange,
  onStateChange,
  onPageChange,
  isAlertsFlyout = false,
  monitorType,
  alertActions = [],
}) => {
  let supportedStateOptions = stateOptions;
  switch (monitorType) {
    case MONITOR_TYPE.DOC_LEVEL:
      const supportedStates = [ALERT_STATE.ACKNOWLEDGED, ALERT_STATE.ACTIVE, ALERT_STATE.ERROR];
      supportedStateOptions = stateOptions.filter((state) =>
        _.includes(supportedStates, state.value)
      );
      break;
  }
  return (
    <EuiFlexGroup style={{ padding: '0px 16px 16px' }} gutterSize="s">
      <EuiFlexItem>
        <EuiCompressedFieldSearch
          fullWidth={true}
          placeholder="Search"
          onChange={onSearchChange}
          value={search}
        />
      </EuiFlexItem>

      {isAlertsFlyout ? null : (
        <EuiFlexItem grow={false}>
          <EuiCompressedSelect
            options={severityOptions}
            value={severity}
            onChange={onSeverityChange}
          />
        </EuiFlexItem>
      )}

      <EuiFlexItem grow={false}>
        <EuiCompressedSelect
          options={supportedStateOptions}
          value={state}
          onChange={onStateChange}
          data-test-subj={'dashboardAlertStateFilter'}
        />
      </EuiFlexItem>
      {alertActions.map((action, idx) => (
        <EuiFlexItem grow={false}>{action}</EuiFlexItem>
      ))}
      <EuiFlexItem grow={false} style={{ justifyContent: 'center' }}>
        <EuiPagination pageCount={pageCount} activePage={activePage} onPageClick={onPageChange} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default DashboardControls;
