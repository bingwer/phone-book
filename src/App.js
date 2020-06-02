import React, { Component } from 'react';
import './App.css';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

const data = JSON.parse(localStorage.getItem('data'));

class App extends Component {
  id = 0;

  state = {
    information: [],
  };

  // TODO : 로컬 스토리지 내용을 파싱받아와서 뿌려주기

  /*state = {
    information: [
      {
        id: 0,
        name: '김민준',
        phone: '000-0000-0000',
      },
      {
        id: 1,
        name: '홍길동',
        phone: '111-1111-1111',
      },
    ],
    keyword: '',
  };*/

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data }),
    });
  };

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((info) => info.id !== id), //id가 삭제할 id가 아닌것만 필터링 해서 새로 만들어줌
    });
  };

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map((info) =>
        id === info.id ? { ...info, ...data } : info,
      ),
    });
  };

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      (info) => info.name.indexOf(keyword) !== -1,
    );
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <p>
          <input
            placeholder="검색 할 이름을 입력하세요"
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
