using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Models;

namespace PoweredByOprum.Helpers
{
    public static class OprumHelpers
    {
        public static List<string> GetPrevaluesFromDataType(string dataTypeName)
        {
            var prevalueList = new List<string>();

            var dataType = ApplicationContext.Current.Services.DataTypeService.GetDataTypeDefinitionByName(dataTypeName);

            if (dataType == null)
            {
                return prevalueList;
            }

            PreValueCollection preValues = ApplicationContext.Current.Services.DataTypeService.GetPreValuesCollectionByDataTypeId(dataType.Id);

            if (preValues == null)
            {
                return prevalueList;
            }

            IDictionary<string, PreValue> tempDictionary = preValues.FormatAsDictionary();

            prevalueList = tempDictionary.Select(p => p.Value.Value).ToList();

            return prevalueList;
        }
    }
}