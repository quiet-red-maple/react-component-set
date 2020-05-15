import React from 'react';
import Trading from '../../containers/TVChartContainer';
import { connect } from 'react-redux';
import {
  getKline
} from '../../redux/actions/socket';

interface Props {
  getKline: (data: any) => any;
}

const mapStateToProps = (user: any) => (user)

const mapDispatchToProps = (dispatch: any) => ({
  getKline: (value: any) => dispatch(getKline(value))
})

const TradingView = (props: Props) => {
  return (
    <div>
    <Trading getKline={props.getKline}/>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingView)