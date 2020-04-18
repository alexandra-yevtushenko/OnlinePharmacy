﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlinePharmacy.Models
{
    public class Orders
    {
        public Orders()
        {
    
        }

        public int id { get; set; }
        public int medInStoresId { get; set; }
        public int amount { get; set; }
        public string name { get; set; }
        public string tel { get; set; }
        public string email { get; set; }
        public DateTime date { get; set; }

        public virtual MedcinesInDrugstores MedId { get; set; }
        public virtual MedcinesInDrugstores StoreId { get; set; }
    }
}
