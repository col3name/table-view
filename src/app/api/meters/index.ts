import axios, { CancelToken } from "axios";

import { BASE_URL } from "../constant";

type GetAddressOption = {
  limit: number;
  offset: number;
  cancelToken: CancelToken;
};

export const getAddresses = async ({
  limit = 1,
  offset,
  cancelToken,
}: GetAddressOption) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v4/test/meters/`, {
      params: { limit: limit, offset },
      cancelToken,
    });
    if (response.status > 400) {
      return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response.data;
  } catch (error) {
    console.error({ error });
    return undefined;
  }
};

export const getArea = async (areaId: string) => {
  try {
    const response = await axios.get(BASE_URL + "/api/v4/test/areas/", {
      params: {
        id__in: areaId,
      },
    });
    const results = response?.data?.results || [];
    if (results.length < 1) {
      return undefined;
    }
    return results.at(0);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const deleteMeter = async (
  meterId: string,
  cancelToken: CancelToken,
): Promise<boolean> => {
  try {
    const response = await axios.delete(
      BASE_URL + `/api/v4/test/meters/${meterId}/`,
      {
        cancelToken,
      },
    );
    return response.status === 204;
  } catch (error) {
    console.error({ error });
    return false;
  }
};
