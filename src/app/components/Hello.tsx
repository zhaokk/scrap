import * as React from 'react';
import ReactTable from 'react-table';
import * as colorsJson from './data/allProduct.json';
let moment = require('moment');

export class ScrapDataView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    let data: Array<product> = [];
    (colorsJson as any).forEach((element) => {
      data.push(new product(element));
    });
    this.state = {
      data: data
    };
    console.log(colorsJson[0]);
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Category information',
              columns: [
                {
                  Header: 'Catgory Name',
                  accessor: 'catName'
                }
              ]
            },
            {
              Header: 'product info',
              columns: [
                {
                  Header: 'Product image',
                  accessor: 'name'
                },
                {
                  Header: 'Product image',
                  accessor: 'imgUrl',
                  width: 150,
                  Cell: (row) => (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#dadada',
                        borderRadius: '2px'
                      }}
                    >
                      <img src={row.value} />
                    </div>
                  )
                },
                {
                  Header: 'link',
                  accessor: 'url',
                  width: 50,
                  Cell: (row) => (
                    <div
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      <a href={row.value} target="_blank">
                        {' '}
                        link{' '}
                      </a>
                    </div>
                  )
                },
                {
                  Header: 'Price',
                  accessor: 'price',
                  width: 100
                },
                {
                  Header: 'Sale per View',
                  accessor: 'spv',
                  width: 200,
                  Cell: (row) => (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#dadada',
                        borderRadius: '2px'
                      }}
                    >
                      <div
                        style={{
                          width: `${row.value * 100}%`,
                          height: '80%',
                          backgroundColor:
                            row.value > 0.3
                              ? '#85cc00'
                              : row.value > 0.15
                              ? '#ffbf00'
                              : '#ff2e00',
                          borderRadius: '2px',
                          transition: 'all .2s ease-out'
                        }}
                      />
                      {row.value * 100 + '%'}
                    </div>
                  )
                },
                {
                  Header: 'Sold',
                  accessor: 'sold',
                  width: 80
                },
                {
                  Header: 'Sell Per Day',
                  accessor: 'averageSellPerDay',
                  width: 200,
                  Cell: (row) => (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#dadada',
                        borderRadius: '2px'
                      }}
                    >
                      <div
                        style={{
                          width: `${row.value }%`,
                          height: '80%',
                          backgroundColor:
                            row.value > 3
                              ? '#85cc00'
                              : row.value > 15
                              ? '#ffbf00'
                              : '#ff2e00',
                          borderRadius: '2px',
                          transition: 'all .2s ease-out'
                        }}
                      />
                      {row.value}
                    </div>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export class product {
  name: string = '';
  imgUrl: string = '';
  price: number = 0;
  sold: number = 0;
  url: string = '';
  spvText: string = '';
  spv: number = 0;
  view: number = 0;
  watch: number = 0;
  sellHistory: Array<NumberSoldDate> = [];
  averageSellPerDay: number = 0;

  constructor(product?: any) {
    if (!product) {
      return;
    }
    for (let field in product) {
      if (field === 'spvText') {
        this.spvText = product[field];
        this.spv = Number(product[field].split('=')[1]);
      } else if (field === 'averageSellPerDay') {
        product[field].forEach((element) => {
          this.sellHistory.push(new NumberSoldDate(element.date, element.sold));
        });
      } else {
        this[field] = product[field];
      }
    }
    try{
      let startDate = moment(this.sellHistory[0].date,'DD/MM/YYYY');
      let endDate = moment(this.sellHistory[this.sellHistory.length-1].date,'DD/MM/YYYY');
      let duration = moment.duration(startDate.diff(endDate)).asDays();
      let soldSum = 0;
      this.sellHistory.forEach(element=>{
        soldSum +=element.sold
      });
      this.averageSellPerDay = Math.ceil(soldSum/duration);
    }catch(e){
      console.log(e.message);
    }
  }
}
export class NumberSoldDate {
  date: string;
  sold: number = 0;
  constructor(date: string, sold: number) {
    this.date = date;
    this.sold = sold;
  }
}
