import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CLabel, CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal,
} from '@coreui/react';
import {MdDelete} from 'react-icons/md';
import moment from 'moment';

import {connect} from 'react-redux';
import {deleteMatchRecord, deleteSwipeCard, getAllMatchUsersAction} from 'src/actions/userAction';

let selectedUser = {};

const MatchUsers = props => {
  const queryPage = useLocation ().search.match (/page=([0-9]+)/, '');
  const currentPage = Number (queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState (currentPage);
  const [visible, setVisible] = useState(false);

  useEffect (
    () => {
      currentPage !== page && setPage (currentPage);
    },
    [currentPage, page]
  );

  useEffect(() => {
    const unsubscribe = props.getAllMatches();
    return unsubscribe;
  }, [])

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Match Users
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={props.matchUsers}
              fields={[
                {key: 'name'},
                'match_name',
                'created',
                'status',
                {
                  key: 'show_details',
                  label: 'Action',
                  _style: {width: '12%'},
                  sorter: false,
                  filter: false,
                },
              ]}
              tableFilter={{
                label: 'Search',
                placeholder: 'Search Name',
              }}
              itemsPerPageSelect={{
                label: 'Items',
                values: [10, 50, 100],
              }}
              itemsPerPage={10}
              pagination
              activePage={page}
              clickableRows
              scopedSlots={{
                name: item => (
                  <td>
                    <CLabel color={'black'}>
                      {item.userInfo.name}
                    </CLabel>
                  </td>
                ),
                match_name: item => (
                  <td>
                    <CLabel color={'black'}>
                      {item.otherInfo.name}
                    </CLabel>
                  </td>
                ),
                created: item => (
                  <td>
                    <CLabel color={'black'}>
                      {moment
                        .unix (item.createdAt)
                        .format ('DD MMM, YYYY hh:mm a')}
                    </CLabel>
                  </td>
                ),
                status: item => (
                  <td>
                    <CBadge color={'success'}>
                      {'Matched'}
                    </CBadge>
                  </td>
                ),
                show_details: (item, index) => {
                  return (
                    <td>
                      <CButton
                          color="red"
                          variant="outline"
                          shape="round"
                          size="sm"
                          onClick={() => {
                            selectedUser = item;
                            setVisible(!visible)
                          }}
                        >
                          <MdDelete color={'#eb5781'} size={15} />
                        </CButton>
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CModal show={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Delete User</CModalTitle>
        </CModalHeader>
        <CModalBody>{`Are you sure you want to delete this match card and also delete related data like conversation, etc. If exit?`}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => {
            deleteMatchRecord(selectedUser.userInfo.uid, selectedUser.otherInfo.uid).then(response => {
              setVisible(false)
            }).catch(error => {

            })
          }}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

const mapStateToProps = state => ({
  matchUsers: state.auth.matchUsers,
});

const mapDispatchToProps = dispatch => ({
  getAllMatches: () => dispatch (getAllMatchUsersAction ()),
});

export default connect (mapStateToProps, mapDispatchToProps) (MatchUsers);
