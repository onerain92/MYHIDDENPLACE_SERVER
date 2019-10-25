const User = require("../../models/User");
const Place = require("../../models/Place");
const Tag = require("../../models/Tag");
const Comment = require("../../models/Comment");

exports.getPlaceAll = async (req, res, next) => {
  try {
    const place = await Place.find();
    const placeInfo = await Promise.all(
      place.map(async place => {
        const placeDoc = JSON.parse(JSON.stringify(place._doc));
        const createUser = await User.findById(place.created_by);
        const tagName = await Promise.all(
          place.tag.map(async tag => {
            const foundTagName = await Tag.findById(tag);
            return foundTagName.name;
          })
        );

        placeDoc.created_by = createUser.username;
        placeDoc.tag = tagName;

        return placeDoc;
      })
    );

    return res.status(200).send(placeInfo);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ errorMessage: "Internal Server Error" });
  }
};

exports.getSearchedPlace = async (req, res, next) => {
  try {
    let serachInput = req.query.word;
    const reg = new RegExp("^" + serachInput);
    const tagId = await Tag.find({ name: { $regex: reg } });
    const tagedPlace = await Promise.all(
      tagId.map(async tag => {
        const tagIdDoc = JSON.parse(JSON.stringify(tag._doc));
        const selectedPlace = await Place.find({ tag: { _id: tagIdDoc._id } });

        return selectedPlace;
      })
    );

    if (tagedPlace.length === 0) {
      return res.status(400).send({
        searchedPlace: [],
        isSearched: false,
        searchFailMessage: "검색 결과가 없습니다."
      });
    }

    const searchedPlace = tagedPlace[0].map(place => {
      return place;
    });

    const searchedPlaceInfo = await Promise.all(
      searchedPlace.map(async searchedPlace => {
        const searchedPlaceDoc = JSON.parse(JSON.stringify(searchedPlace._doc));
        const createUser = await User.findById(searchedPlace.created_by);
        const tagName = await Promise.all(
          searchedPlace.tag.map(async tag => {
            const foundTagName = await Tag.findById(tag);
            return foundTagName.name;
          })
        );

        searchedPlaceDoc.created_by = createUser.username;
        searchedPlaceDoc.tag = tagName;

        return searchedPlaceDoc;
      })
    );

    return res.status(200).send({ searchedPlaceInfo, isSearched: true });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .send({ searchFailMessage: "검색을 실패했습니다.", isSearched: false });
  }
};

exports.getMyPlace = async (req, res, next) => {
  const userId = req.params.user_id;
  const myPlaces = await Place.find({ created_by: userId });

  if (myPlaces.length === 0) {
    return res
      .status(400)
      .send({ myPlaceErrorMessage: "등록한 장소가 없습니다." });
  }

  const myPlaceInfo = await Promise.all(
    myPlaces.map(async myplace => {
      const myPlaceDoc = JSON.parse(JSON.stringify(myplace._doc));
      const tagName = await Promise.all(
        myplace.tag.map(async tag => {
          const foundTagName = await Tag.findById(tag);
          return foundTagName.name;
        })
      );
      myPlaceDoc.tag = tagName;
      return myPlaceDoc;
    })
  );

  return res.status(200).send(myPlaceInfo);
};

exports.getMyFavorite = async (req, res, next) => {
  const userId = req.params.user_id;
  const myFavoriteList = await User.findById({ _id: userId }).select(
    "-_id favorite"
  );

  const myFavoritePlace = await Promise.all(
    myFavoriteList.favorite.map(async favor => {
      const favoritePlace = await Place.findById({ _id: favor });
      return favoritePlace;
    })
  );

  const myFavoritePlaceInfo = await Promise.all(
    myFavoritePlace.map(async favoritePlace => {
      const favoritePlaceDoc = JSON.parse(JSON.stringify(favoritePlace._doc));
      const tagName = await Promise.all(
        favoritePlace.tag.map(async tag => {
          const foundTagName = await Tag.findById(tag);
          return foundTagName.name;
        })
      );
      favoritePlaceDoc.tag = tagName;
      return favoritePlaceDoc;
    })
  );

  return res.status(200).send(myFavoritePlaceInfo);
};

exports.deleteMyPlace = async (req, res, next) => {
  const myPlaceId = req.params.myplace_id;
  await Place.findByIdAndDelete({ _id: myPlaceId });
  await Comment.findByIdAndDelete({ place: myPlaceId });

  return res
    .status(200)
    .send({ deleteMyPlaceSuccessMessage: "장소를 삭제하였습니다." });
};

exports.createPlace = async (req, res, next) => {
  const tags = req.body.tags;
  const { title, description, address, latlng, imgfile } = req.body.placeInfo;

  try {
    try {
      await Promise.all(
        tags.map(async tag => {
          await Tag.findOneAndUpdate(
            { name: tag },
            { name: tag },
            { upsert: true }
          );
        })
      );
    } catch (err) {
      console.error(err);
    }

    const updatedId = await Promise.all(
      tags.map(async tag => {
        const foundTag = await Tag.findOne({ name: tag });
        return foundTag._id;
      })
    );

    await Place.create({
      title,
      created_by: req.user,
      created_at: new Date(),
      place_picture: imgfile,
      description,
      address,
      location: {
        type: "Point",
        coordinates: [latlng.lng, latlng.lat]
      },
      tag: updatedId
    });

    return res.status(200).send({ successMessage: "장소 정보 업로드 성공" });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ errorMessage: "장소 정보 업로드 실패" });
  }
};

exports.getPlaceDetails = async (req, res, next) => {
  try {
    const placeId = req.params.place_id;
    const placeDetails = await Place.findById(placeId);
    const placeDetailsDoc = JSON.parse(JSON.stringify(placeDetails._doc));
    const createUser = await User.findById(placeDetailsDoc.created_by);
    const tagName = await Promise.all(
      placeDetailsDoc.tag.map(async tag => {
        const foundTagName = await Tag.findById(tag);
        return foundTagName.name;
      })
    );

    placeDetailsDoc.created_by = createUser.username;
    placeDetailsDoc.tag = tagName;

    return res.status(200).send({ placeDetails: placeDetailsDoc });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      placeDetailsErrorMessage: "상세페이지를 불러오기를 실패했습니다."
    });
  }
};
