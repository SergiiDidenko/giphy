export interface GiphyDTO {
    data: GiphyDataDTO[];
    pagination: GiphyPaginationDTO;
  }
  
  export interface GiphyDataDTO {
    id: string;
    title: string;
    images: GiphyImagesDTO;
  }
  
  export interface GiphyImagesDTO {
    original: GiphyImageDTO;
    preview: GiphyImageDTO;
  }
  
  export interface GiphyImageDTO {
    url: string;
    width: string;
    height: string;
  }
  
  export interface GiphyPaginationDTO {
    total_count: number;
    count: number;
    offset: number;
  }
  

  export interface GifUserDTO {
    avatar_url?: string;
    display_name?: string;
    username?: string;
    description?: string;
  }
  
  export interface GifImagesDTO{
    original: {
      url: string;
    };
  }
  
  export interface GifDetailsDataDTO {
    user?: GifUserDTO;
    images?: GifImagesDTO;
    title?: string;
  }
  
  export interface GifDetailsDTO {
    data: GifDetailsDataDTO;
   
  }
  