import React, { PropTypes, Component } from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';

export default class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = { type: '', assignee: '', reporter: '', state: '', priority: '', resolution: '', created_at: '', updated_at: '', title: '' };
  }

  componentWillMount() {
    const { query={} } = this.props;
    this.state.type = query.type || ''; 
    this.state.assignee = query.assignee || ''; 
    this.state.reporter = query.reporter || ''; 
    this.state.state = query.state || ''; 
    this.state.resolution = query.resolution || ''; 
    this.state.priority = query.priority || ''; 
    this.state.created_at = query.created_at || ''; 
    this.state.updated_at = query.updated_at || ''; 
    this.state.title = query.title || ''; 
  }

  componentWillReceiveProps(nextProps) {
    const newQuery = nextProps.query || {};
    this.setState({ 
      type: newQuery.type ? newQuery.type : '',
      assignee: newQuery.assignee ? newQuery.assignee : '',
      reporter: newQuery.reporter ? newQuery.reporter : '',
      state: newQuery.state ? newQuery.state : '',
      resolution: newQuery.resolution ? newQuery.resolution : '',
      priority: newQuery.priority ? newQuery.priority : '',
      created_at: newQuery.created_at ? newQuery.created_at : '',
      updated_at: newQuery.updated_at ? newQuery.updated_at : '',
      title: newQuery.title ? newQuery.title : ''
    });
  }

  static propTypes = {
    refresh: PropTypes.func,
    query: PropTypes.object,
    searchShow: PropTypes.bool,
    options: PropTypes.object,
    indexLoading: PropTypes.bool.isRequired
  }

  clean() {
    this.setState({ type: '', assignee: '', reporter: '', state: '', priority: '', resolution: '', created_at: '', updated_at: '', title: '' });
  }

  search() {
    const { query={}, refresh } = this.props;

    const newQuery = {};
    if (this.state.type) {  newQuery.type = this.state.type; }
    if (this.state.assignee) { newQuery.assignee = this.state.assignee; }
    if (this.state.reporter) { newQuery.reporter = this.state.reporter; }
    if (this.state.state) { newQuery.state = this.state.state; }
    if (this.state.resolution) { newQuery.resolution = this.state.resolution; }
    if (this.state.priority) { newQuery.priority = this.state.priority; }
    if (this.state.created_at) { newQuery.created_at = this.state.created_at; }
    if (this.state.updated_at) { newQuery.updated_at = this.state.updated_at; }
    if (this.state.title) { newQuery.title = this.state.title; }

    if (query.orderBy) { newQuery.orderBy = query.orderBy; }

    refresh(newQuery);
  }

  render() {
    const { indexLoading, searchShow=false, options: { types=[], states=[], priorities=[], resolutions=[], users=[] } } = this.props;

    const typeOptions = _.map(types, (val) => { return { label: val.name, value: val.id } });
    const userOptions = _.map(users, (val) => { return { label: val.name, value: val.id } });
    const stateOptions = _.map(states, (val) => { return { label: val.name, value: val.id } });
    const priorityOptions = _.map(priorities, (val) => { return { label: val.name, value: val.id } });
    const resolutionOptions = _.map(resolutions, (val) => { return { label: val.name, value: val.id } });
    const dateOptions = [{ label: '一周内', value: '1w' }, { label: '两周内', value: '2w' }, { label: '一月内', value: '1m' }, { label: '一月外', value: '-1m' }];

    return (
      <Form horizontal style={ { marginTop: '10px', marginBottom: '15px' } } className={ !searchShow && 'hide' }>
        <FormGroup controlId='formControlsLabel'>
          <Col sm={ 1 } componentClass={ ControlLabel }>
            类型 
          </Col>
          <Col sm={ 3 }>
            <Select
              simpleValue
              placeholder='选择类型'
              value={ this.state.type }
              onChange={ (newValue) => { this.setState({ type: newValue }); } }
              options={ typeOptions }/>
          </Col>
          <Col sm={ 1 } componentClass={ ControlLabel }>
            经办人
          </Col>
          <Col sm={ 3 }>
            <Select
              simpleValue
              placeholder='选择经办人'
              value={ this.state.assignee }
              onChange={ (newValue) => { this.setState({ assignee: newValue }); } }
              options={ userOptions }/>
          </Col>
          <Col sm={ 1 } componentClass={ ControlLabel }>
            报告人
          </Col>
          <Col sm={ 3 }>
            <Select
              simpleValue
              placeholder='选择报告人'
              value={ this.state.reporter }
              onChange={ (newValue) => { this.setState({ reporter: newValue }); } }
              options={ userOptions }/>
          </Col>
        </FormGroup>
        <FormGroup controlId='formControlsLabel'>
          <Col sm={ 1 } componentClass={ ControlLabel }>
            状态
          </Col>
          <Col sm={ 3 }>
            <Select
              simpleValue
              placeholder='选择状态'
              value={ this.state.state }
              onChange={ (newValue) => { this.setState({ state: newValue }); } }
              options={ stateOptions }/>
          </Col>
          <Col sm={ 1 } componentClass={ ControlLabel }>
            解决结果 
          </Col>
          <Col sm={ 3 }>
            <Select
              simpleValue
              placeholder='选择解决结果'
              value={ this.state.resolution }
              onChange={ (newValue) => { this.setState({ resolution: newValue }); } }
              options={ resolutionOptions }/>
          </Col>
          <Col sm={ 1 } componentClass={ ControlLabel }>
            优先级
          </Col>
          <Col sm={ 3 }>
            <Select
              simpleValue
              placeholder='选择优先级'
              value={ this.state.priority }
              onChange={ (newValue) => { this.setState({ priority: newValue }); } }
              options={ priorityOptions }/>
          </Col>
        </FormGroup>
        <FormGroup controlId='formControlsLabel'>
          <Col sm={ 1 } componentClass={ ControlLabel }>
            创建时间
          </Col>
          <Col sm={ 3 }>
            <Select
              simpleValue
              placeholder='选择时间段'
              value={ this.state.created_at }
              onChange={ (newValue) => { this.setState({ created_at: newValue }); } }
              options={ dateOptions }/>
          </Col>
          <Col sm={ 1 } componentClass={ ControlLabel }>
            更新时间
          </Col>
          <Col sm={ 3 }>
            <Select
              simpleValue
              placeholder='选择时间段'
              value={ this.state.updated_at }
              onChange={ (newValue) => { this.setState({ updated_at: newValue }); } }
              options={ dateOptions }/>
          </Col>
          <Col sm={ 1 } componentClass={ ControlLabel }>
            主题
          </Col>
          <Col sm={ 3 }>
            <FormControl
              type='text'
              value={ this.state.title }
              onChange={ (e) => { this.setState({ title: e.target.value }) } }
              placeholder={ '输入关键字' } />
          </Col>
        </FormGroup>
        <FormGroup controlId='formControlsLabel'>
          <Col sm={ 12 }>
            <Button style={ { float: 'right' } } className='create-btn' onClick={ this.clean.bind(this) }>清空 <i className='fa fa-undo'></i></Button>
            <Button style={ { float: 'right' } } className='create-btn' disabled={ indexLoading } onClick={ this.search.bind(this) }>搜索 <i className='fa fa-search'></i></Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
