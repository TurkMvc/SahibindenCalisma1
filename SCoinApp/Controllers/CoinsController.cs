using Newtonsoft.Json;
using SCoinApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace SCoinApp.Controllers
{
    public class CoinsController : ApiController
    {
        public HttpResponseMessage GetEthereum()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://etherchain.org/api/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var jsonString = client.GetStringAsync("https://etherchain.org/api/statistics/price").Result;
            var responseData = JsonConvert.DeserializeObject<EthereumModel>(jsonString);
            responseData.data.ForEach(x =>
                x.time = new DateTime(x.time.Year, x.time.Month, x.time.Day)
            );

            responseData.data = responseData.data.GroupBy(i => i.time).Select(g => new EthereumData
            {
                time = g.Key,
                usd = g.Max(row => row.usd)
            }).ToList();
            var result = responseData.data.Select(x => new CoinData(x)).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}
