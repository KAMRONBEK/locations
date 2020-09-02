import {setSearchStatus, setSearchResultText} from '../actions/searchState';
import {SEARCHING, DONE_SEARCHING, MAP_WITH_LIST} from '../../constants';
import Service from '../../services/service';
import {strings} from '../../locales/strings';
import {setDisplayData, mapPressed, setMapMode} from '../actions/mapState';

export const search = (keyword, searchData) => async (dispatch) => {
    dispatch(setSearchStatus(SEARCHING));
    try {
        let result = await Service.search({
            searchKey: keyword,
            list: searchData,
        });
        dispatch(
            setSearchResultText(
                strings.found + ' ' + result.length + ' ' + strings.results,
            ),
        );
        dispatch(setMapMode(MAP_WITH_LIST));
        dispatch(setDisplayData(result));
    } catch (error) {
        console.log(error, 'in search');
    } finally {
        dispatch(setSearchStatus(DONE_SEARCHING));
    }
};