import React, {createRef} from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

const initValues = {
  inputFName: React.createRef(),
  inputLName: React.createRef(),
  inputPhone: React.createRef()
}



class PhoneBookForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "Coder",
      lastName: "Byte",
      phoneNumber: "8885559999",
      list: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    event.preventDefault();
    //const existingList = [initValues.inputFirstName.current.value, initValues.inputLastName.current.value, initValues.inputPhoneNumber.current.value];
    const currentList = [initValues.inputFName.current.value , initValues.inputLName.current.value, initValues.inputPhone.current.value];
    this.setState({list: [...this.state.list, currentList]});
  }

  render() {
    return (

      <div><h1>Contact</h1></div>
      /* <form onSubmit={this.handleClick} style={style.form.container}>
        <label>First name:</label>
        <br />
        <input
          style={style.form.inputs}
          name="firstName"
          className='userFirstname'
          ref={initValues.inputFName}
          defaultValue={this.state.firstName}
          type='text'
        />
        <br />
        <label>Last name:</label>
        <br />
        <input
          style={style.form.inputs}
          name="lastName"
          className='userLastname'
          ref={initValues.inputLName}
          defaultValue={this.state.lastName}
          type='text'
        />
        <br />
        <label>Phone:</label>
        <br />
        <input
          style={style.form.inputs}
          name="phoneNumber"
          className='userPhone'
          ref={initValues.inputPhone}
          defaultValue={this.state.phoneNumber}
          type='text'
        />
        <br />
        <input
          style={style.form.submitBtn}
          className='submitButton'
          type='submit'
          value='Add User'
        />
        <InformationTable list={this.state.list}/>
      </form> */
       

    )
  }
}

function InformationTable(props) {
  const list = props.list;
  return (
    <table style={style.table} className='informationTable'>
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {list.sort((a,b) => a[1] > b[1] ? 1: - 1 ).map((record, index) => {
          return(<tr key={index}>
          <td>{record[0]}</td>
          <td>{record[1]}</td>
          <td>{record[2]}</td>
          </tr>)
        })}

      </tbody>
      
    </table>

  );
}

function Application(props) {
  return (
    <section>
      <PhoneBookForm />
      <InformationTable list={props.list}/>
    </section>
  );
}


export default PhoneBookForm;