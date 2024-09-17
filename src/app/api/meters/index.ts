import axios from "axios";

type GetAddressOption = { limit: number, offset: number };

export const getAddresses = async ({
                                       limit = 1,
                                       offset,
                                   }: GetAddressOption) => {
    try {
        const response = await axios.get(
            `http://showroom.eis24.me/api/v4/test/meters/`,
            {
                withCredentials: true,
                params: {limit: limit, offset},
            }
        );
        if (response.status > 400) {
            return undefined;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return response.data;
    } catch (error) {
        console.error({error});
        return undefined;
    }
};

export const getArea = async (areaId: string) => {
     try {
         const response = await axios.get(
             'http://showroom.eis24.me/api/v4/test/areas/',
             {
                 params: {
                     id__in: areaId
                 },
             }
         );
         const results = response?.data?.results || [];
         if (results.length < 1) {
             return undefined;
         }
         return results.at(0);
     } catch (error) {
         console.error(error)
         return undefined
     }
}

export const deleteMeter = async (meterId: string): Promise<boolean> => {
    try {
        const response = await axios.delete(
            `http://showroom.eis24.me/api/v4/test/meters/${meterId}/`
        );
        return (response.status === 204);
    } catch (error) {
        console.error({error});
        return false;
    }
}