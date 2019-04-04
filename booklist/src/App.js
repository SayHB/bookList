import React, {Component} from 'react';
import {Table, Divider, Button, Input, Icon, Pagination} from 'antd';
import DatePicker from 'antd/lib/date-picker';  // 加载 JS
import 'antd/lib/date-picker/style/css';        // 加载 CSS
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
            search: {
                id: '',
                name: '',
                startTime: '',
                endTime: ''
            },
            currentPage: 1,

        }

    }

    componentDidMount() {
        fetch('mock/bookInfo.json').then(res => {
            if (res.ok) {
                res.json().then(bookList => {
                    this.setState({bookList: bookList})
                })
            }
        })
    }

    render() {
        const columns = [{
            title: '书ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '书名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '发布时间',
            dataIndex: 'publishTime',
            key: 'publishTime',
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span>
          <Button onClick={() => this.handleOnclickSearch(record.id)} type={"primary"} ghost>查看</Button>
          <Button onClick={() => this.handleOnclickDel(record.id)} type={"primary"} ghost>删除</Button>
          </span>
            )
        }
        ]
        const {search,bookList,currentPage} = this.state;
        const {id,name,startTime,endTime} = search || {};
        return (
            <div>
                <div className={'Bottom'}>
                    <div style={{marginTop: '15px'}}>
                        <Input style={{width: '150px', marginLeft: '50px'}} onChange={this.handleIdChange}
                               value={id} onFocus={this.componentDidMount.bind(this)}/>
                        <Input style={{width: '150px', marginLeft: '150px'}} onChange={this.handleNameChange}
                               value={name} onFocus={this.componentDidMount.bind(this)}/>
                        <Button style={{marginLeft: '50px'}} type="primary" icon="search"
                                onClick={this.searchBook}>搜索</Button>
                    </div>
                    <div style={{marginTop: '15px', marginBottom: '15px'}}>
                        <Input style={{width: '150px', marginLeft: '50px'}} value={startTime}
                               onFocus={this.componentDidMount.bind(this)}/>
                        <Icon type={'arrow-right'} style={{width: '50px', marginLeft: '50px'}}/>
                        <Input style={{width: '150px', marginLeft: '50px'}} value={endTime}
                               onFocus={this.componentDidMount.bind(this)}/>
                    </div>
                    <div style={{marginLeft: '50px', textAlign: 'center'}}>
                        <Table dataSource={bookList} columns={columns} bordered={true} pagination={{
                            defaultCurrent: currentPage,
                            total: 6,
                            pageSize: 4,
                            onChange: this.onChange
                        }} bordered/>
                        {/*<Pagination defaultCurrent={currentPage} total={10} pageSize={4} onChange={this.onChange}/>*/}
                    </div>
                </div>
            </div>
        );
    }

    onChange = (page) => {
        this.setState({
            currentPage: page,
        })
    }
    searchBook = () => {
        const {bookList,search} = this.state;
        const {id, name} = search || {};
        const idToNumber = Number(id);
        const newBookList = bookList.filter((item) => {
            // if(!!id && !!name){
            //     return item.id === idToNumber && item.name === name
            // }else if(!id && !!name){
            //     return item.name === name
            // }else if (!!id && !name){
            //     return item.id === idToNumber
            // } else{
            //     return true
            // }
            return (
                !!id && !!name && item.id === idToNumber && item.name === name ||
                !!id && !name && item.id === idToNumber ||
                !id && !!name && item.name === name ||
                !id && !name

            )
        })
        this.setState({
            // idValue: "",
            // name:"",
            // timeValueOne:"",
            // timeValueTwo:"",
            bookList: newBookList,
        })
    }
    handleNameChange = (e) => {
        const {search} = this.state
        // const {id} = search || {}
        const newSearch = JSON.parse(JSON.stringify(search))
        newSearch.name =e.target.value;
        this.setState({
            search:newSearch
        })
    }
    handleIdChange = (e) => {
        const {search} = this.state;
        const newSearch = JSON.parse(JSON.stringify(search));
        newSearch.id = e.target.value;
        this.setState({
            search: newSearch
        })
    }
    // handleTimeChange = () =>{
    //   this.setState({
    //     TimeValue:e.target.value
    //   })
    // }
    handleOnclickSearch = (id) => {
        const {bookList} = this.state;
        const bookInfo = bookList.find((item) => {
            return item.id === id
        });
        const infoString = [bookInfo.id, bookInfo.name, bookInfo.publishTime, bookInfo.author]
        const bookString = infoString.join("  ")
        window.confirm(bookString)
    }
    handleOnclickDel = (id) => {
        const {bookList} = this.state;
        // immutable
        const clonedBookList = bookList.slice();
        const bookIndex = clonedBookList.findIndex((item) => {
            return item.id === id
        });
        clonedBookList.splice(bookIndex, 1)
        this.setState({
            bookList: clonedBookList
        })
    }

}

export default App;
