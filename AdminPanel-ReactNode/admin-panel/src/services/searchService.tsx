// searchService.ts

import axios from "axios";
import { getToken } from "../components/authservice";
const baseURL = `${process.env.REACT_APP_API_SERVER_URL}/v1`;

type CommonSearchParams = {
  [key: string]: any;
};

//type CommonSearchParams = UserSearchParams | CmsSearchParams;

export const handleSearch = async <T extends CommonSearchParams>(
  searchTerms: T,
  endpoints: string
): Promise<any[]> => {
  //export const handleSearch = async (searchTerms: SearchParams, endpoints: string) => {
  try {
    const token = getToken();

    const nonEmptySearchTerms = Object.fromEntries(
      Object.entries(searchTerms).filter(([_, value]) => value.trim() !== "")
    );
    const queryParams = new URLSearchParams(nonEmptySearchTerms).toString();

    if (Object.keys(nonEmptySearchTerms).length > 0) {
      const response = await axios.get(
        `${baseURL}/${endpoints}/?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.data;
    }
    return [];
  } catch (error) {
    throw new Error("Search failed");
  }
};
