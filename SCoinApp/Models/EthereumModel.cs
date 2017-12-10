using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCoinApp.Models
{
    public class EthereumModel
    {
        public string status { get; set; }
        public List<EthereumData> data { get; set; }
    }
    public class EthereumData
    {
        public DateTime time { get; set; }
        public double usd { get; set; }
    }
    public class CoinData
    {
        public CoinData()
        {

        }
        public DateTime date { get; set; }
        public string coinType { get; set; }
        public double value { get; set; }
        public CoinData(EthereumData et)
        {
            this.date = et.time;
            this.value = et.usd;
            this.coinType = "Ethereum";
        }
    }
}