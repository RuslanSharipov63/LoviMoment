const PhotoModel = require("./../models/Photo");

/* получаем все фото */

const getAll = async (req, res) => {

  try {
    /* здесь мы не только получаем все фото, но еще и юзера нашего. в схеме мы сделали эту связь. выполняем populate и передаем в него наш параметр, можно строку, а можно если надо и объект. exec - это выполнить запрос. passwordHash можно удалить */

    const photos = await PhotoModel.find()
    /* .populate("user")
    .sort({ _id: -1 })
    .exec(); */
    res.json(photos);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить фотографии",
    });
  }
};
/* получаем одну фото */
const getOne = async (req, res) => {

  try {
    const photoId = req.params.id;
    /* у  mongodb есть метод findOneById - чтобы получить что-то по id. но нам надо вместе с открытием фото еще и обновлять кол-во просмотров. поэтому сделаем по-другому. это он сделает, а нам число просмотров не надо */
    const photo = await PhotoModel.findById(photoId).populate("user").exec();
    if (!photo) {
      return res.json({
        mesage: "Фотография не найдена",
      });
    }
    const { passwordHash, ...photoData } = photo._doc;
    return res.json(photoData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка сервера",
    });
  }
};

/* получаем все фото автора по id автора*/
const getAllPhotoForUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const allPhotoAuthor = await PhotoModel.find({ user: userId })
      .sort({ _id: -1 })
      .populate("user")
      .exec();
    return res.json(allPhotoAuthor);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка сервера",
    });
  }
};

const create = async (req, res) => {
  try {
    const doc = new PhotoModel({
      imageURL: req.body.imageURL,
      tags: req.body.tags,
      size: req.body.size,
      user: req.userId,
      price: req.body.price,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось добавить фото",
    });
  }
};

/* удаляем фото */
const remove = async (req, res) => {
  const photoId = await req.params.id;
  try {
    await PhotoModel.findByIdAndDelete({ _id: photoId });
    return res.json({
      message: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: false,
    });
  }
};

/* удаляем все фото одного юзера */

const removeAllPhotoUser = async (req, res) => {
  const userId = await req.params.id;
  try {
    const listImageUrlPhotoUser = await PhotoModel.find(
      { user: userId },
      { imageURL: 1 }
    );
    await PhotoModel.deleteMany({ user: userId });
    return res.json(listImageUrlPhotoUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не удалось удалить фотографии",
    });
  }
};

/* обновляем теги */

const updateTags = async (req, res) => {
  try {
    await PhotoModel.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: { tags: req.body.tags, price: req.body.price },
      }
    );
    return res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
    });
  }
};

/* поиск фото по тегам */

const searchTags = async (req, res) => {
  const valueSearch = await req.params.searchtags;
  try {
    /*  await PhotoModel.createIndex( {'tags': "text"} )
   const resultSearch = await PhotoModel.find({ $text: { $search: valueSearch } })   */
    const resultSearch = await PhotoModel.find({ 'tags': new RegExp(valueSearch) })

    return res.json(resultSearch);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
    });
  }

}

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  updateTags,
  getAllPhotoForUserId,
  removeAllPhotoUser,
  searchTags
};


